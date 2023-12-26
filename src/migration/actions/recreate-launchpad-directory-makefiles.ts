import { ASSETS } from "../../resources/embedded-assets";
import {
    LAUNCHPAD_MAKEFILE_DOCUMENTATION,
    LAUNCHPAD_MAKEFILE_FOOTER,
    LAUNCHPAD_MAKEFILE_HEADER,
} from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/Makefiles.*
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryMakefiles(context: MigrationContext) {
    const files = [LAUNCHPAD_MAKEFILE_DOCUMENTATION, LAUNCHPAD_MAKEFILE_HEADER, LAUNCHPAD_MAKEFILE_FOOTER] as const;
    files.forEach(makefile => (context.files.get(makefile).contents = ASSETS[makefile as keyof typeof ASSETS]));
}
