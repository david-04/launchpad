import { LAUNCHPAD_MAKEFILE_DOCUMENTATION } from "../data/known-files.js";
import type { MigrationContext } from "../data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Update all files in the .launchpad directory
//----------------------------------------------------------------------------------------------------------------------

export function updateLaunchpadDirectory(context: MigrationContext) {
    context.files.get(LAUNCHPAD_MAKEFILE_DOCUMENTATION).contents = "";
}
