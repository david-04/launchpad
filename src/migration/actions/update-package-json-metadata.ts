import type { MigrationContext } from "../data/migration-context";
import type { PackageJson, PackageJsonOperations } from "../files/package-json";

//----------------------------------------------------------------------------------------------------------------------
// Update package.json general metadata
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageJsonMetadata(context: MigrationContext) {
    const packageJson = context.fileOperations.packageJson;
    setIfMissing(packageJson, "name", context.newConfig.projectName);
    setIfMissing(packageJson, "version", "0.0.0");
    setIfMissing(packageJson, "private", true);
    setIfMissing(packageJson, "license", "UNLICENSED");
    setIfMissing(packageJson, "module", ({ esm: "module", cjs: "commonjs" } as const)[context.newConfig.moduleSystem]);
}

//----------------------------------------------------------------------------------------------------------------------
// Add a top-level key if it's not already there
//----------------------------------------------------------------------------------------------------------------------

function setIfMissing<T extends keyof PackageJson>(
    packageJson: PackageJsonOperations,
    key: keyof PackageJson,
    value: PackageJson[T]
) {
    const json = packageJson.json;
    if (!(key in json)) {
        packageJson.json = { ...json, [key]: value };
    }
}
