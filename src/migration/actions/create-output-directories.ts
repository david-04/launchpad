import { MigrationContext } from "migration/data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create output directories
//----------------------------------------------------------------------------------------------------------------------

export function createOutputDirectories(context: MigrationContext) {
    const config = context.newConfig;
    const { tscOutDir, bundlerOutDir } = config;
    if (bundlerOutDir) {
        context.directories.get(bundlerOutDir).create();
    } else {
        context.directories.get(tscOutDir).create();
    }
}
