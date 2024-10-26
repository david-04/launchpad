import { NewConfig } from "../../config/config-objects";
import { ASSETS } from "../../resources/embedded-assets.generated";
import { LAUNCHPAD_BIOME_DEFAULT_JSON } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/biome.default.json
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryBiome(context: MigrationContext) {
    if (context.newConfig.formatter.value === "biome") {
        context.files.get(LAUNCHPAD_BIOME_DEFAULT_JSON).contents = getCustomizedBiomeConfig(context.newConfig);
    } else {
        context.files.get(LAUNCHPAD_BIOME_DEFAULT_JSON).delete();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Assemble the default biome configuration
//----------------------------------------------------------------------------------------------------------------------

function getCustomizedBiomeConfig({ tabSize, formatter }: NewConfig) {
    const json = JSON.parse(ASSETS[LAUNCHPAD_BIOME_DEFAULT_JSON]);
    json.formatter.enabled = formatter.value === "biome";
    json.formatter.indentWidth = tabSize;
    json.linter.enabled = false;
    return JSON.stringify(json, undefined, tabSize);
}
