import { TSCONFIG_JSON } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create tsconfig.json if it does not exist
//----------------------------------------------------------------------------------------------------------------------

export function updateTsconfigJson(context: MigrationContext) {
    const tsconfigJson = context.files.get(TSCONFIG_JSON);
    if (!tsconfigJson.exists) {
        tsconfigJson.json = {
            extends: "./.launchpad/tsconfig.default.json",
        };
    }
}
