import { MigrationContext } from "migration/data/migration-context";
import { getAllPackageManagersExcept, getPackageManager } from "migration/package-managers/package-manager-registry";

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
