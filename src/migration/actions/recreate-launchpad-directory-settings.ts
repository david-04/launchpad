import { serializeConfig } from "../../config/config-serializer";
import { LAUNCHPAD_CFG } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/cfg.cfg
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectorySettings(context: MigrationContext) {
    context.files.get(LAUNCHPAD_CFG).contents = serializeConfig(context.newConfig);
}
