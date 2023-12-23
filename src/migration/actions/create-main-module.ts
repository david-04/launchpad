import { MigrationContext } from "migration/data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Prepare the main module's source file
//----------------------------------------------------------------------------------------------------------------------

export function createMainModule(context: MigrationContext) {
    if (context.newConfig.createProjectTemplate) {
        const mainModule = context.files.get(context.mainModulePath);
        if (!mainModule.exists) {
            const message = `This is ${context.newConfig.projectName}`;
            mainModule.contents = `console.log(${JSON.stringify(message)});`;
        }
    }
}
