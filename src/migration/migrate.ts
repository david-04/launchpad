import { writeFileSync } from "fs";
import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects";
import { ERROR_LOG_FILE } from "../utilities/constants";
import { fail } from "../utilities/fail";
import { breakAndLog, createSeparator } from "../utilities/logging";
import { breakLine } from "../utilities/string-utilities";
import { calculateNewConfig } from "./actions/calculate-new-config";
import { createIndexCss } from "./actions/create-index-css";
import { createIndexHtml } from "./actions/create-index-html";
import { createMainModule } from "./actions/create-main-module";
import { createMakefile } from "./actions/create-makefile";
import { createDebugModule } from "./actions/createDebugModule";
import { preparePackageManagerCommands } from "./actions/prepare-package-manager-commands";
import { updateGitignore } from "./actions/update-gitignore";
import { updateLaunchpadDirectory } from "./actions/update-launchpad-directory";
import { updatePackageJson } from "./actions/update-package-json";
import { updatePackageManagerFiles } from "./actions/update-package-manager-files";
import { updateTsconfigJson } from "./actions/update-tsconfig-json";
import { updateVsCodeSettings } from "./actions/update-vscode-settings";
import { MigrationContext, type MigrationContextOptions } from "./data/migration-context";
import { applyFileSystemChanges } from "./executor/apply-file-system-changes";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrateOptions = Omit<MigrationContextOptions, "oldConfig" | "newConfig"> & {
    operation: "initialize" | "uplift";
} & (
        | { oldConfig: OldPartialConfig | undefined; newConfig: NewConfig }
        | { oldConfig: OldConfig; newConfig: undefined }
    );

//----------------------------------------------------------------------------------------------------------------------
// Perform the migration
//----------------------------------------------------------------------------------------------------------------------

export function migrate(options: MigrateOptions) {
    const newConfig = options.newConfig ?? calculateNewConfig(options, options.oldConfig);
    const context = new MigrationContext({ ...options, newConfig });
    prepareMigrationSteps(context);
    applyFileSystemChanges(context);
    if ("rollback" === context.manualActionRequired) {
        onFileSystemChangesRequireManualRollback(context);
    } else if ("complete" === context.manualActionRequired) {
        onFileSystemChangesRequireManualCompletion(context);
    } else {
        context.manualActionRequired satisfies undefined;
        onFileSystemChangesSucceeded(context);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Prepare the required file system updates
//----------------------------------------------------------------------------------------------------------------------

function prepareMigrationSteps(context: MigrationContext) {
    //
    // config files
    updateGitignore(context);
    updateLaunchpadDirectory(context);
    updatePackageJson(context);
    updatePackageManagerFiles(context);
    updateTsconfigJson(context);
    updateVsCodeSettings(context);

    // project template
    createMainModule(context);
    createDebugModule(context);
    createIndexHtml(context);
    createIndexCss(context);
    createMakefile(context);

    // external commands
    preparePackageManagerCommands(context);
}

//----------------------------------------------------------------------------------------------------------------------
// File system changes failed and require a manual rollback
//----------------------------------------------------------------------------------------------------------------------

function onFileSystemChangesRequireManualRollback(context: MigrationContext) {
    if (context.activityLog.length) {
        console.log("");
        context.activityLog.flatMap(line => breakAndLog("- ", line));
    }
    if (context.manualFileSystemInstructions) {
        console.log("");
        console.log("Please complete the rollback manually as follows:");
        console.log("");
        context.manualFileSystemInstructions.flatMap(line => breakAndLog("- ", line));
    }
    console.log("");
    failMigration(context);
}

//----------------------------------------------------------------------------------------------------------------------
// File system changes failed and require a manual completion
//----------------------------------------------------------------------------------------------------------------------

function onFileSystemChangesRequireManualCompletion(context: MigrationContext) {
    if (context.activityLog.length) {
        console.log("");
        context.activityLog.flatMap(line => breakAndLog("- ", line));
    }
    if (context.manualFileSystemInstructions.length) {
        console.log("");
        console.log(`Please complete the the operation manually as follows:`);
        console.log("");
        context.manualFileSystemInstructions.flatMap(line => breakAndLog("- ", line));
    }
    if (context.externalCommands.length) {
        console.log("");
        if (context.manualFileSystemInstructions.length) {
            console.log("Then run the following commands:");
        } else {
            console.log("`Please complete the ${context.operation} by running the following commands:`");
        }
        console.log("");
        context.externalCommands.map(command => command.argv.join(" ")).flatMap(line => breakAndLog("- ", line));
    }
    console.log("");
    failMigration(context);
}

//----------------------------------------------------------------------------------------------------------------------
// File system changes succeeded, external commands can be executed
//----------------------------------------------------------------------------------------------------------------------

function onFileSystemChangesSucceeded(context: MigrationContext) {
    const summaryOfChanges = [...context.directories.toSummaryOfChanges(), ...context.files.toSummaryOfChanges()];
    if (summaryOfChanges.length) {
        console.log("");
        summaryOfChanges.flatMap(line => breakAndLog("- ", line));
    }
    executeExternalCommands(context);
    if (context.manualActionRequired) {
        console.log("");
        console.log(`Please complete the operation manually by running the following commands:`);
        console.log("");
        context.manualCommandInstructions.flatMap(line => breakAndLog("- ", line));
        console.log("");
        failMigration(context);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Execute all external commands
//----------------------------------------------------------------------------------------------------------------------

function executeExternalCommands(context: MigrationContext) {
    for (const command of context.externalCommands) {
        const stringifiedCommand = command.argv.join(" ");
        if (!context.manualActionRequired) {
            try {
                breakAndLog("- ", command.description);
                command.execute();
                context.activityLog.push(`Ran command: ${stringifiedCommand}`);
            } catch (error) {
                context.activityLog.push(`Tried to run command: ${stringifiedCommand}`);
                context.activityLog.push(`Encountered an error: ${error}`);
                console.log("");
                breakAndLog(`Encountered an error: ${error}`);
                context.manualActionRequired = "complete";
            }
        }
        if (context.manualActionRequired) {
            context.manualCommandInstructions.push(stringifiedCommand);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a log file and fail the migration
//----------------------------------------------------------------------------------------------------------------------

function failMigration(context: MigrationContext) {
    try {
        createLogFile(context);
    } catch (ignored) {}
    fail(`Failed to ${context.operation} the project`);
}

//----------------------------------------------------------------------------------------------------------------------
// Create a log file
//----------------------------------------------------------------------------------------------------------------------

function createLogFile(context: MigrationContext) {
    const file = context.projectRoot.child(ERROR_LOG_FILE);
    const lines = new Array<string>();
    if (file.exists()) {
        lines.push("");
    }
    lines.push(...createSeparator(`${context.startedAt.toISOString()} ${context.operation}`));
    if (context.activityLog.length) {
        lines.push("Performed the following actions:");
        lines.push("");
        lines.push(...context.activityLog.map(line => `- ${line}`));
        lines.push("");
    }
    if ("rollback" === context.manualActionRequired) {
        if (context.manualFileSystemInstructions.length) {
            lines.push("Please complete the rollback manually as follows:");
            lines.push("");
            lines.push(...context.manualFileSystemInstructions.map(line => `- ${line}`));
            lines.push("");
        }
    } else {
        if (context.manualFileSystemInstructions.length) {
            lines.push(`Please complete the operation manually as follows:`);
            lines.push("");
            lines.push(...context.manualFileSystemInstructions.map(line => `- ${line}`));
            lines.push("");
        }
        if (context.manualCommandInstructions.length) {
            if (context.manualFileSystemInstructions.length) {
                lines.push("Then run the following commands:");
            } else {
                lines.push(`Please complete operation manually by running the following commands:`);
            }
            lines.push("");
            lines.push(...context.manualCommandInstructions.map(line => `- ${line}`));
            lines.push("");
        }
    }
    writeFileSync(file.path, lines.flatMap(breakLine).join("\n"), { encoding: "utf-8", flag: "a" });
}
