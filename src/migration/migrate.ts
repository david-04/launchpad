import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects.js";
import { calculateNewConfig } from "./actions/calculate-new-config.js";
import { createDebugModule } from "./actions/create-debug-module.js";
import { createMakefile } from "./actions/create-makefile.js";
import { createProjectTemplate } from "./actions/create-project-template.js";
import { updateGitignore } from "./actions/update-gitignore.js";
import { updateLaunchpadDirectory } from "./actions/update-launchpad-directory.js";
import { updatePackageJson } from "./actions/update-package-json.js";
import { updatePackageManagerFiles } from "./actions/update-package-manager-files.js";
import { updateTsconfigJson } from "./actions/update-tsconfig-json.js";
import { updateVsCodeSettings } from "./actions/update-vscode-settings.js";
import { MigrationContext, type MigrationContextOptions } from "./data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrateOptions = Omit<MigrationContextOptions, "oldConfig" | "newConfig"> &
    (
        | { oldConfig: OldPartialConfig | undefined; newConfig: NewConfig }
        | { oldConfig: OldConfig; newConfig: undefined }
    );

//----------------------------------------------------------------------------------------------------------------------
// Perform the migration
//----------------------------------------------------------------------------------------------------------------------

export function migrate(options: MigrateOptions) {
    const newConfig = options.newConfig ?? calculateNewConfig(options, options.oldConfig);
    const context = new MigrationContext({ ...options, newConfig });

    updateGitignore(context);
    updateLaunchpadDirectory(context);
    updatePackageJson(context);
    updatePackageManagerFiles(context);
    updateTsconfigJson(context);
    updateVsCodeSettings(context);

    createProjectTemplate(context);
    createDebugModule(context);
    createMakefile(context);

    // yarn set version latest => npm|yarn|pnpm|bun install/upgrade all
}
