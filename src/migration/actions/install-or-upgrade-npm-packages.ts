import { MigrationContext } from "../data/migration-context";
import { getPackageManager } from "../package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Install or upgrade all dependencies
//----------------------------------------------------------------------------------------------------------------------

export function installOrUpgradeNpmPackages(context: MigrationContext) {
    const dependencies = context.fileOperations.packageJson.getAllDependencies();
    if (dependencies.length) {
        const hasNodeModules = context.directories.get("node_modules").exists;
        const packageManager = getPackageManager(context);
        const { operation, upliftDependenciesOverride } = context;
        if ("uplift" === operation && (context.newConfig.upliftDependencies || upliftDependenciesOverride)) {
            context.addExternalCommand(
                "Upgrading all dependencies",
                packageManager.upgradeAllPackagesCommand ?? packageManager.getUpgradePackagesCommand(dependencies)
            );
        } else if ("uplift" !== operation || !hasNodeModules) {
            context.addExternalCommand("Installing dependencies", packageManager.installCommand);
        }
    }
}
