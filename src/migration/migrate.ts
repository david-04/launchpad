import { writeFileSync } from "fs";
import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects";
import { ERROR_LOG_FILE } from "../utilities/constants";
import { fail } from "../utilities/fail";
import { breakAndLog, createSeparator } from "../utilities/logging";
import { breakLine } from "../utilities/string-utilities";
import { calculateNewConfig } from "./actions/calculate-new-config";
import { configureFormatter } from "./actions/configure-formatter";
import { configurePackageManager } from "./actions/configure-package-manager";
import { createDebugModule } from "./actions/create-debug-module";
import { createIndexCss } from "./actions/create-index-css";
import { createIndexHtml } from "./actions/create-index-html";
import { createMainModule } from "./actions/create-main-module";
import { createMakefile } from "./actions/create-makefile";
import { createOutputDirectories } from "./actions/create-output-directories";
import { createTsconfigJson } from "./actions/create-tsconfig-json";
import { installOrUpgradeNpmPackages } from "./actions/install-or-upgrade-npm-packages";
import { recreateLaunchpadDirectoryBiome } from "./actions/recreate-launchpad-directory-biome";
import { recreateLaunchpadDirectoryMakefiles } from "./actions/recreate-launchpad-directory-makefiles";
import { recreateLaunchpadDirectoryNodeMinDts } from "./actions/recreate-launchpad-directory-node-min-dts";
import { recreateLaunchpadDirectorySettings } from "./actions/recreate-launchpad-directory-settings";
import { recreateLaunchpadDirectoryTestScripts } from "./actions/recreate-launchpad-directory-test-scripts";
import { recreateLaunchpadDirectoryTsConfig } from "./actions/recreate-launchpad-directory-tsconfig";
import { recreateLaunchpadDirectoryUpliftScripts } from "./actions/recreate-launchpad-directory-uplift-scripts";
import { updateGitignoreBundlerOutput } from "./actions/update-gitignore-bundler-output";
import { updateGitignorePackageManager } from "./actions/update-gitignore-package-manager";
import { updateGitignoreTscOutput } from "./actions/update-gitignore-tsc-output";
import { updatePackageJsonDependencies } from "./actions/update-package-json-dependencies";
import { updatePackageJsonMetadata } from "./actions/update-package-json-metadata";
import { updatePackageJsonPackageManager } from "./actions/update-package-json-package-manager";
import { updateVsCodeSettingsFormatOnSave } from "./actions/update-vscode-settings-format-on-save";
import { updateVsCodeSettingsFormatter } from "./actions/update-vscode-settings-formatter";
import { MigrationContext, type MigrationContextOptions } from "./data/migration-context";
import { applyFileSystemChanges } from "./executor/apply-file-system-changes";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrateOptions = Omit<MigrationContextOptions, "oldConfig" | "newConfig"> & {
    operation: "init" | "uplift";
    upliftDependenciesOverride: boolean;
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
    // package.json
    updatePackageJsonDependencies(context);
    updatePackageJsonMetadata(context);
    updatePackageJsonPackageManager(context);

    // .launchpad/*
    recreateLaunchpadDirectoryMakefiles(context);
    recreateLaunchpadDirectoryNodeMinDts(context);
    recreateLaunchpadDirectorySettings(context);
    recreateLaunchpadDirectoryTsConfig(context);
    recreateLaunchpadDirectoryUpliftScripts(context);
    recreateLaunchpadDirectoryBiome(context);
    recreateLaunchpadDirectoryTestScripts(context);
    recreateLaunchpadDirectoryTestScripts(context);

    // .gitignore
    updateGitignoreBundlerOutput(context);
    updateGitignorePackageManager(context);
    updateGitignoreTscOutput(context);

    // .vscode/settings.json
    updateVsCodeSettingsFormatOnSave(context);
    updateVsCodeSettingsFormatter(context);

    // tsconfig.json
    createTsconfigJson(context);

    // project template
    createDebugModule(context);
    createIndexHtml(context);
    createIndexCss(context);
    createMainModule(context);
    createMakefile(context);

    // output directories
    createOutputDirectories(context);

    // code formatter
    configureFormatter(context);

    // package manager
    configurePackageManager(context);

    // install and upgrade npm packages
    installOrUpgradeNpmPackages(context);
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
        summaryOfChanges.forEach(line => console.log(`- ${line}`));
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
                breakAndLog("- ", `${command.description}...`);
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
    } catch {}
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
