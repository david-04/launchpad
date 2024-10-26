import { ASSETS } from "../../resources/embedded-assets.generated";
import { LAUNCHPAD_NODE_MIN_DTS } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/node.min.dts
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryNodeMinDts(context: MigrationContext) {
    context.files.get(LAUNCHPAD_NODE_MIN_DTS).contents = ASSETS[LAUNCHPAD_NODE_MIN_DTS];
}
