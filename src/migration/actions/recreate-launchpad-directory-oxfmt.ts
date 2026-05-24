import { NewConfig } from "../../config/config-objects";
import { ASSETS } from "../../resources/embedded-assets.generated";
import { LAUNCHPAD_OXFMT_DEFAULT_JSON } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/oxfmt.default.json
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryOxfmt(context: MigrationContext) {
    if (context.newConfig.formatter.value === "oxfmt") {
        context.files.get(LAUNCHPAD_OXFMT_DEFAULT_JSON).contents = getCustomizedOxfmtConfig(context.newConfig);
    } else {
        context.files.get(LAUNCHPAD_OXFMT_DEFAULT_JSON).delete();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Assemble the default oxfmt configuration
//----------------------------------------------------------------------------------------------------------------------

function getCustomizedOxfmtConfig({ tabSize }: NewConfig) {
    const json = JSON.parse(ASSETS[LAUNCHPAD_OXFMT_DEFAULT_JSON]);
    json.tabWidth = tabSize;
    return JSON.stringify(json, undefined, tabSize);
}
