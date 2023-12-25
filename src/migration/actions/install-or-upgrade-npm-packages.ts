import { MigrationContext } from "migration/data/migration-context";
import { getPackageManager } from "migration/package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Install or upgrade all dependencies
//----------------------------------------------------------------------------------------------------------------------

export function installOrUpgradeNpmPackages(context: MigrationContext) {
    const dependencies = context.fileOperations.packageJson.getAllDependencies();
    if (dependencies.length) {
        const packageManager = getPackageManager(context);
        context.addExternalCommand(
            context.directories.get("node_modules").exists ? "Upgrading all dependencies" : "Installing dependencies",
            packageManager.upgradeAllPackagesCommand ?? packageManager.getUpgradePackagesCommand(dependencies)
        );
    }
}
