import { serializeConfig } from "../../config/config-serializer";
import { LAUNCHPAD_SETTINGS_CFG } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/settings.cfg
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectorySettings(context: MigrationContext) {
    context.files.get(LAUNCHPAD_SETTINGS_CFG).contents = serializeConfig(context.newConfig);
}
