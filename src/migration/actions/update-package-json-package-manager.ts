import type { MigrationContext } from "../data/migration-context";
import { PackageJsonOperations } from "../files/package-json";
import { getPackageManager } from "../package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Configure the package manager in package.json
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageJsonPackageManager(context: MigrationContext) {
    const { packageJson } = context.fileOperations;
    pinSwpmPackageManager(context, packageJson);
}

//----------------------------------------------------------------------------------------------------------------------
// Pin the package manager for SWPM
//----------------------------------------------------------------------------------------------------------------------

function pinSwpmPackageManager(context: MigrationContext, packageJson: PackageJsonOperations) {
    const identifier = getPackageManager(context).swpmIdentifier;
    if (identifier) {
        packageJson.json = { ...packageJson.json, swpm: identifier };
    } else {
        packageJson.deleteProperty("swpm");
    }
}
