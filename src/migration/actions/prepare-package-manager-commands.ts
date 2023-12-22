import type { MigrationContext } from "../data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Create package manager commands
//----------------------------------------------------------------------------------------------------------------------

export function preparePackageManagerCommands(context: MigrationContext) {
    installOrUpgradeYarn(context);
    upgradeAllPackagesToLatestVersion(context);
}

//----------------------------------------------------------------------------------------------------------------------
// Install or upgrade yarn
//----------------------------------------------------------------------------------------------------------------------

function installOrUpgradeYarn(context: MigrationContext) {
    if ("yarn" === context.newConfig.packageManager.value) {
        const hasChanged = context.oldConfig?.packageManager?.value !== context.newConfig.packageManager.value;
        const message = hasChanged ? "Installing yarn" : "Upgrading yarn to the latest version";
        context.addExternalCommand(message, ["yarn", "set", "version", "stable"]);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Upgrade all packages
//----------------------------------------------------------------------------------------------------------------------

function upgradeAllPackagesToLatestVersion(context: MigrationContext) {
    const upgradeAllPackages = "Upgrading all packages to the latest version";
    const allPackages = getAllInstalledPackages(context);
    if ("npm" === context.newConfig.packageManager.value) {
        context.addExternalCommand(upgradeAllPackages, ["npm", "install", ...allPackages.map(pkg => `${pkg}@latest`)]);
    } else if ("pnpm" === context.newConfig.packageManager.value) {
        context.addExternalCommand(upgradeAllPackages, ["yarn", "up", "*@latest"]);
    } else {
        context.newConfig.packageManager.value satisfies "yarn";
        context.addExternalCommand(upgradeAllPackages, ["pnpm", "up", "--latest"]);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get all installed packages
//----------------------------------------------------------------------------------------------------------------------

function getAllInstalledPackages(context: MigrationContext) {
    const packageJson = context.fileOperations.packageJson.json;
    return ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].map(section =>
        Object.keys(packageJson[section] ?? {})
    );
}
