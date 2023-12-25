import { NewConfig } from "config/config-objects";
import type { MigrationContext } from "../data/migration-context";
import type { PackageJsonOperations } from "../files/package-json";

//----------------------------------------------------------------------------------------------------------------------
// Update package.json
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageJsonDependencies(context: MigrationContext) {
    const packageJson = context.fileOperations.packageJson;
    updateDependencies(context, packageJson);
    updateDevDependencies(context.newConfig, packageJson);
}

//----------------------------------------------------------------------------------------------------------------------
// Add runtime dependencies
//----------------------------------------------------------------------------------------------------------------------

function updateDependencies(context: MigrationContext, packageJson: PackageJsonOperations) {
    context.newConfig.dependencies.forEach(dependency => packageJson.addDependencyIfMissing(dependency, "*"));
}

//----------------------------------------------------------------------------------------------------------------------
// Add and remove dev dependencies
//----------------------------------------------------------------------------------------------------------------------

function updateDevDependencies(config: NewConfig, packageJson: PackageJsonOperations) {
    const addOrRemove = <const T extends string>(configuredValue: T, map: Record<T, ReadonlyArray<string>>) =>
        addAndRemoveDevDependencies(config.installDevDependencies, packageJson, configuredValue, map);

    addOrRemove("always", { always: ["typescript", "ts-node"] });
    addOrRemove(config.bundler.value, { disabled: [], esbuild: ["esbuild"] });
    addOrRemove(config.dtsBundler.value, { disabled: [], "dts-bundle-generator": ["dts-bundle-generator"] });
    addOrRemove(config.formatter.value, { disabled: [], prettier: ["prettier"], biome: ["@biomejs/biome"] });
}

function addAndRemoveDevDependencies<const T extends string>(
    installDevDependencies: boolean,
    packageJson: PackageJsonOperations,
    configuredValue: T,
    map: Record<T, ReadonlyArray<string>>
) {
    const npmPackagesToRemove = new Set<string>();
    for (const key in map) {
        map[key]?.forEach(npmPackage => npmPackagesToRemove.add(npmPackage));
    }
    if (installDevDependencies) {
        map[configuredValue]?.forEach(npmPackage => {
            packageJson.addDevDependencyIfMissing(npmPackage, "*");
            npmPackagesToRemove.delete(npmPackage);
        });
    }
    npmPackagesToRemove.forEach(dependency => packageJson.removeDependencyIfExists(dependency));
}
