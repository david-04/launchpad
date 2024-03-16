import { ASSETS } from "../../resources/embedded-assets";
import { adjustTabSize } from "../../utilities/string-utilities";
import { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create the project template's CSS file
//----------------------------------------------------------------------------------------------------------------------

export function createIndexCss(context: MigrationContext) {
    if (context.newConfig.createProjectTemplate && "web" === context.newConfig.runtime.value) {
        const css = context.files.get(`${context.newConfig.webAppDir}/index.css`);
        if (!css.exists) {
            css.contents = adjustTabSize(ASSETS["resources/templates/index.css"], 4, context.newConfig.tabSize);
        }
    }
}
