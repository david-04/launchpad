import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create a debug module
//----------------------------------------------------------------------------------------------------------------------

export function createDebugModule(context: MigrationContext) {
    if (context.newConfig.createDebugModule) {
        const debugModule = context.files.get(`${context.newConfig.srcDir}/debug.ts`);
        if (!debugModule.exists) {
            const extension = "cjs" === context.newConfig.moduleSystem ? "" : "";
            debugModule.contents = `import from ${JSON.stringify(context.mainModule + extension)};`;
        }
    }
}
