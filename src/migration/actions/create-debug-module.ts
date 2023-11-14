import type { MigrationContext } from "../data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Create a debug module
//----------------------------------------------------------------------------------------------------------------------

export function createDebugModule(context: MigrationContext) {
    if (context.newConfig.createDebugModule) {
        const debugModule = context.files.get(`${context.newConfig.srcDir}/debug.ts`);
        if (!debugModule.exists) {
            const extension = "cjs" === context.newConfig.moduleSystem ? ".js" : "";
            debugModule.contents = `import from ${JSON.stringify(context.mainModule + extension)};`;
        }
    }
}
