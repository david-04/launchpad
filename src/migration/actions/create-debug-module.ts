import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create a debug module
//----------------------------------------------------------------------------------------------------------------------

export function createDebugModule(context: MigrationContext) {
    const debugModule = context.files.get(context.debugModulePath);
    const mainModule = context.files.get(context.mainModulePath);
    if (context.newConfig.createDebugModule && !debugModule.exists) {
        if (mainModule.exists || context.newConfig.createProjectTemplate) {
            const importFileExtension = "esm" === context.newConfig.moduleSystem ? ".js" : "";
            const importPath = `./${context.newConfig.projectName}${importFileExtension}`;
            debugModule.contents = `import ${JSON.stringify(importPath)};`;
        } else {
            debugModule.contents = `console.log("This is the debug module");`;
        }
    }
}
