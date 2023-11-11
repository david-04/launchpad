import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects.js";
import { calculateNewConfig } from "./actions/calculate-new-config.js";
import { createTsconfigJson } from "./actions/create-tsconfig-json.js";
import { updateLaunchpadDirectory } from "./actions/update-launchpad-directory.js";
import { updatePackageJson } from "./actions/update-package-json.js";
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
    createTsconfigJson(context);
    updateLaunchpadDirectory(context);
    updatePackageJson(context);

    // .gitignore (exclude build folder)
    // package manager (lock files, .yarnrc, etc)
    // makefile
    // project template
}
