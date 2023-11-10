import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects.js";
import { calculateNewConfig } from "./actions/calculate-new-config.js";
import { updateLaunchpadDirectory } from "./actions/update-launchpad-directory.js";
import { updatePackageJson } from "./actions/update-package-json.js";
import { MigrationContext } from "./data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrateOptions = Omit<ConstructorParameters<typeof MigrationContext>[0], "oldConfig" | "newConfig"> &
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
    const context = new MigrationContext({ ...options, newConfig });
    context.skippedSteps.push(...skippedSteps);

    updatePackageJson(context);
    updateLaunchpadDirectory(context);
}
