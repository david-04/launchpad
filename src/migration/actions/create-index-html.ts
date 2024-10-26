import { relative } from "path";
import { ASSETS } from "../../resources/embedded-assets.generated";
import { adjustTabSize } from "../../utilities/string-utilities";
import { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create the web app
//----------------------------------------------------------------------------------------------------------------------

export function createIndexHtml(context: MigrationContext) {
    if (context.newConfig.createProjectTemplate && "web" === context.newConfig.runtime.value) {
        const html = context.files.get(`${context.newConfig.webAppDir}/index.html`);
        if (!html.exists) {
            const contents = ASSETS["resources/templates/index.html"]
                .replace(/<!--\s*PROJECT_NAME\s*-->/g, context.newConfig.projectName)
                .replace(/<!--\s*JAVASCRIPT\s*-->/g, getScriptTag(context));
            html.contents = adjustTabSize(contents, 4, context.newConfig.tabSize);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get the <script> tag to load the main module
//----------------------------------------------------------------------------------------------------------------------

function getScriptTag(context: MigrationContext) {
    const path = getRelativeJsMainModulePath(context);
    return "esm" === context.newConfig.moduleSystem && "disabled" === context.newConfig.bundler.value
        ? `<script src="${path}" charset="utf-8" type="module"></script>`
        : `<script src="${path}" charset="utf-8"></script>`;
}

//----------------------------------------------------------------------------------------------------------------------
// Get the relative path from the HTML file to the JavaScript main module
//----------------------------------------------------------------------------------------------------------------------

function getRelativeJsMainModulePath(context: MigrationContext) {
    const usesBundler = "disabled" !== context.newConfig.bundler.value;
    const jsDirectory = usesBundler ? context.newConfig.bundlerOutDir : context.newConfig.tscOutDir;
    const fileName = `${context.newConfig.projectName}.js`;
    const htmlDirectory = context.newConfig.webAppDir;
    const relativePath = relative(htmlDirectory, jsDirectory).replaceAll("\\", "/");
    const normalizedRelativePath = relativePath ? `${relativePath}/` : "";
    return htmlDirectory === jsDirectory ? fileName : `${normalizedRelativePath}${fileName}`;
}
