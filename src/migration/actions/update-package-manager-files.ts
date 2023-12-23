import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Configure the package manager
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageManagerFiles(context: MigrationContext) {
    configurePackageManagerFilesNpm(context);
    configurePackageManagerFilesYarn(context);
    configurePackageManagerFilesPnpm(context);
    context.directories.get("node_modules/.ignored").delete();
}

//----------------------------------------------------------------------------------------------------------------------
// npm
//----------------------------------------------------------------------------------------------------------------------

function configurePackageManagerFilesNpm(context: MigrationContext) {
    if ("npm" !== context.newConfig.packageManager.value) {
        context.files.get(".npmrc").delete();
        context.files.get("package-lock.json").delete();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// pnpm
//----------------------------------------------------------------------------------------------------------------------

function configurePackageManagerFilesPnpm(context: MigrationContext) {
    if ("pnpm" !== context.newConfig.packageManager.value) {
        context.files.get(".npmrc").delete();
        context.files.get("pnpm-lock.yaml").delete();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Yarn
//----------------------------------------------------------------------------------------------------------------------

function configurePackageManagerFilesYarn(context: MigrationContext) {
    if ("yarn" !== context.newConfig.packageManager.value) {
        context.directories.get(".yarn").delete();
        context.files.get(".yarnrc.yml").delete();
        context.files.get("yarn.lock").delete();
    } else {
        const yarnrc = context.files.get(".yarnrc.yml");
        yarnrc.contents = yarnrc.contents ?? "nodeLinker: node-modules";
    }
}
