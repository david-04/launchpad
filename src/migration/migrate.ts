import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects.js";
import { calculateNewConfig } from "./actions/calculate-new-config.js";
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

export type MigrateOptions = Omit<MigrationContextOptions, "oldConfig" | "newConfig" | "skippedSteps"> &
    (
        | { oldConfig: OldPartialConfig | undefined; newConfig: NewConfig }
        | { oldConfig: OldConfig; newConfig: undefined }
    );

//----------------------------------------------------------------------------------------------------------------------
// Perform the migration
//----------------------------------------------------------------------------------------------------------------------

export function migrate(options: MigrateOptions) {
    const skippedSteps = new Array<string>();
    const newConfig = options.newConfig ?? calculateNewConfig(options, options.oldConfig, skippedSteps);
    const context = new MigrationContext({ ...options, newConfig, skippedSteps });

    updateGitignore(context);
    updateLaunchpadDirectory(context);
    updatePackageJson(context);
    updatePackageManagerFiles(context);
    updateTsconfigJson(context);
    updateVsCodeSettings(context);

    // project template + Makefile + debug module

    // yarn set version latest => npm|yarn|pnpm|bun install/upgrade all
}
