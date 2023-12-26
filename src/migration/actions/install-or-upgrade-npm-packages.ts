import { MigrationContext } from "migration/data/migration-context";
import { getPackageManager } from "migration/package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Install or upgrade all dependencies
//----------------------------------------------------------------------------------------------------------------------

export function installOrUpgradeNpmPackages(context: MigrationContext) {
    const dependencies = context.fileOperations.packageJson.getAllDependencies();
    if (dependencies.length) {
        const hasNodeModules = context.directories.get("node_modules").exists;
        const packageManager = getPackageManager(context);
        if ("uplift" === context.operation && context.newConfig.upliftDependencies) {
            context.addExternalCommand(
                "Upgrading all dependencies",
                packageManager.upgradeAllPackagesCommand ?? packageManager.getUpgradePackagesCommand(dependencies)
            );
        } else if ("uplift" !== context.operation || !hasNodeModules) {
            context.addExternalCommand("Installing dependencies", packageManager.installCommand);
        }
    }
}
