import { MigrationContext } from "../data/migration-context";
import { getAllPackageManagersExcept, getPackageManager } from "../package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Configure the package manager
//----------------------------------------------------------------------------------------------------------------------

export function configurePackageManager(context: MigrationContext) {
    const activePackageManager = context.newConfig.packageManager.value;
    getAllPackageManagersExcept(activePackageManager).forEach(packageManager =>
        packageManager.removeConfigurationAndArtifacts(context)
    );
    getPackageManager(activePackageManager).createOrUpdateConfiguration(context);
}
