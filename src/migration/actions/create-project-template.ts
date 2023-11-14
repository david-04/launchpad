import * as path from "path";
import { ASSETS } from "../../resources/embedded-assets.js";
import { adjustTabSize } from "../../utilities/string-utilities.js";
import type { MigrationContext } from "../data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Create a project template
//----------------------------------------------------------------------------------------------------------------------

export function createProjectTemplate(context: MigrationContext) {
    if (context.newConfig.createProjectTemplate) {
        if ("web" === context.newConfig.runtime.value) {
            createProjectTemplateWeb(context);
        } else {
            createProjectTemplateCli(context);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Command line app
//----------------------------------------------------------------------------------------------------------------------

function createProjectTemplateCli(context: MigrationContext) {
    const mainModule = context.files.get(`${context.mainModule}.ts`);
    if (!mainModule.exists) {
        mainModule.contents = 'console.log("Hello world!");';
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Web app
//----------------------------------------------------------------------------------------------------------------------

function createProjectTemplateWeb(context: MigrationContext) {
    createProjectTemplateWebHtml(context);
    createProjectTemplateWebCss(context);
}

function createProjectTemplateWebHtml(context: MigrationContext) {
    const html = context.files.get(`${context.newConfig.webAppDir}/index.ts`);
    if (!html.exists) {
        const contents = ASSETS["resources/templates/index.html"]
            .replaceAll("__PROJECT_NAME__", context.newConfig.projectName)
            .replaceAll("__JAVASCRIPT__", getJsPath(context));
        html.contents = adjustTabSize(contents, 4, context.newConfig.tabSize);
    }
}

function createProjectTemplateWebCss(context: MigrationContext) {
    const css = context.files.get(`${context.newConfig.webAppDir}/index.css`);
    if (!css.exists) {
        css.contents = adjustTabSize(ASSETS["resources/templates/index.css"], 4, context.newConfig.tabSize);
    }
}

function getJsPath(context: MigrationContext) {
    const fileName = `${context.newConfig.projectName}.js`;
    const usesBundler = "disabled" !== context.newConfig.bundler.value;
    const jsDir = usesBundler ? context.newConfig.bundlerOutDir : context.newConfig.tscOutDir;
    const htmlDir = context.newConfig.webAppDir;
    return htmlDir === jsDir ? fileName : `${path.relative(htmlDir, jsDir)}/${fileName}`;
}
