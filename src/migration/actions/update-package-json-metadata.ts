import { VERSION_1_0_4, VERSION_1_0_5 } from "../../config/version-number";
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
    setIfMissing(packageJson, "type", ({ esm: "module", cjs: "commonjs" } as const)[context.newConfig.moduleSystem]);
    removeModuleProperty(context, packageJson);
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

//----------------------------------------------------------------------------------------------------------------------
// Up to version 1.0.4, the module property was accidentally named "module" (instead of "type")
//----------------------------------------------------------------------------------------------------------------------

function removeModuleProperty(context: MigrationContext, packageJson: PackageJsonOperations) {
    if (!("module" in packageJson.json)) {
        return;
    }
    if ("module" !== packageJson.json["module"] && "commonjs" !== packageJson.json["module"]) {
        return;
    }
    const currentVersion = context.oldConfig?.version ?? VERSION_1_0_5;
    if (currentVersion.compareTo(VERSION_1_0_4) <= 0) {
        const json = { ...packageJson.json };
        delete json["module"];
        packageJson.json = json;
    }
}
