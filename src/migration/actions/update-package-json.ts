import type { MigrationContext } from "../data/migration-context.js";
import type { PackageJsonOperations, PackageJsonPrettier } from "../files/package-json.js";

//----------------------------------------------------------------------------------------------------------------------
// Update package.json
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageJson(context: MigrationContext) {
    const packageJson = context.fileOperations.packageJson;
    updatePackageJsonGeneralMetadata(context, packageJson);
    updatePackageJsonDevDependencies(context, packageJson);
    updatePackageJsonRuntimeDependencies(context, packageJson);
    updatePackageJsonPrettierConfiguration(context, packageJson);
    updatePackageJsonPinnedPackageManager(context, packageJson);
}

//----------------------------------------------------------------------------------------------------------------------
// Update general metadata
//----------------------------------------------------------------------------------------------------------------------

function updatePackageJsonGeneralMetadata(context: MigrationContext, packageJson: PackageJsonOperations) {
    updatePackageJsonName(context, packageJson);
    updatePackageJsonVersion(packageJson);
    updatePackageJsonPrivate(packageJson);
    updatePackageJsonModule(context, packageJson);
}

function updatePackageJsonName(context: MigrationContext, packageJson: PackageJsonOperations) {
    if (!("name" in packageJson.json)) {
        packageJson.json = { ...packageJson.json, name: context.newConfig.projectName };
        packageJson.file.logAdded("name");
    }
}

function updatePackageJsonVersion(packageJson: PackageJsonOperations) {
    if (!("version" in packageJson.json)) {
        packageJson.json = { ...packageJson.json, version: "0.0.0" };
        packageJson.file.logAdded("version");
    }
}

function updatePackageJsonPrivate(packageJson: PackageJsonOperations) {
    if (!("private" in packageJson.json)) {
        packageJson.json = { ...packageJson.json, private: true };
        packageJson.file.logAdded("private");
    }
}

function updatePackageJsonModule(context: MigrationContext, packageJson: PackageJsonOperations) {
    const requiredType = ({ esm: "module", cjs: "commonjs" } as const)[context.newConfig.moduleSystem];
    if (packageJson.json.type !== requiredType) {
        packageJson.json = { ...packageJson.json, type: requiredType };
        packageJson.file.logAdded("private");
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update dev dependencies
//----------------------------------------------------------------------------------------------------------------------

function updatePackageJsonDevDependencies(context: MigrationContext, packageJson: PackageJsonOperations) {
    const update = <const T extends string>(configuredValue: T, map: Record<T, ReadonlyArray<string>>) =>
        addAndRemoveDevDependencies(context.newConfig.installDevDependencies, packageJson, configuredValue, map);

    update("typescript", { typescript: ["typescript", "ts-node"] });
    update(context.newConfig.bundler.value, { disabled: [], esbuild: ["esbuild"] });
    update(context.newConfig.dtsBundler.value, { disabled: [], "dts-bundle-generator": ["dts-bundle-generator"] });
    update(context.newConfig.formatter.value, { disabled: [], prettier: ["prettier"] });
}

function addAndRemoveDevDependencies<const T extends string>(
    installDevDependencies: boolean,
    packageJson: PackageJsonOperations,
    configuredValue: T,
    map: Record<T, ReadonlyArray<string>>
) {
    const toRemove = new Set<string>();
    for (const key in map) {
        map[key]?.forEach(dependency => toRemove.add(dependency));
    }
    if (installDevDependencies) {
        map[configuredValue]?.forEach(dependency => {
            if (packageJson.addDevDependencyIfNotExists(dependency, "*")) {
                packageJson.file.logAdded(dependency);
            }
            toRemove.delete(dependency);
        });
    }
    toRemove.forEach(dependency => {
        if (packageJson.removeDependencyIfExists(dependency)) {
            packageJson.file.logRemoved(dependency);
        }
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Update runtime dependencies
//----------------------------------------------------------------------------------------------------------------------

function updatePackageJsonRuntimeDependencies(context: MigrationContext, packageJson: PackageJsonOperations) {
    context.newConfig.dependencies.forEach(dependency => {
        if (packageJson.addDependencyIfNotExists(dependency, "*")) {
            packageJson.file.logAdded(dependency);
        }
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Update the prettier configuration
//----------------------------------------------------------------------------------------------------------------------

export function updatePackageJsonPrettierConfiguration(context: MigrationContext, packageJson: PackageJsonOperations) {
    if ("prettier" === context.newConfig.formatter.value) {
        const hasCreated = !!packageJson.json.prettier;
        const hasUpdated =
            updatePackageJsonPrettierProperty(packageJson, "arrowParens", "avoid") ||
            updatePackageJsonPrettierProperty(packageJson, "bracketSameLine", false) ||
            updatePackageJsonPrettierProperty(packageJson, "bracketSpacing", true) ||
            updatePackageJsonPrettierProperty(packageJson, "embeddedLanguageFormatting", "auto") ||
            updatePackageJsonPrettierProperty(packageJson, "endOfLine", "lf") ||
            updatePackageJsonPrettierProperty(packageJson, "htmlWhitespaceSensitivity", "css") ||
            updatePackageJsonPrettierProperty(packageJson, "jsxSingleQuote", false) ||
            updatePackageJsonPrettierProperty(packageJson, "printWidth", 120) ||
            updatePackageJsonPrettierProperty(packageJson, "proseWrap", "preserve") ||
            updatePackageJsonPrettierProperty(packageJson, "quoteProps", "as-needed") ||
            updatePackageJsonPrettierProperty(packageJson, "semi", true) ||
            updatePackageJsonPrettierProperty(packageJson, "singleAttributePerLine", false) ||
            updatePackageJsonPrettierProperty(packageJson, "singleQuote", false) ||
            updatePackageJsonPrettierProperty(packageJson, "tabWidth", context.newConfig.tabSize, "overwrite") ||
            updatePackageJsonPrettierProperty(packageJson, "trailingComma", "es5") ||
            updatePackageJsonPrettierProperty(packageJson, "useTabs", false);
        if (hasCreated) {
            packageJson.file.logAdded("prettier configuration");
        } else if (hasUpdated) {
            packageJson.file.logUpdated("prettier configuration");
        }
    }
}

function updatePackageJsonPrettierProperty<T extends keyof PackageJsonPrettier>(
    packageJson: PackageJsonOperations,
    key: T,
    value: PackageJsonPrettier[T],
    overwrite?: "overwrite"
) {
    const prettierConfig = packageJson.json.prettier ?? {};
    if (!(key in prettierConfig) || (prettierConfig[key] !== value && overwrite === "overwrite")) {
        packageJson.json = { ...packageJson.json, prettier: { ...prettierConfig, [key]: value } };
        return true;
    } else {
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update packager manager pins
//----------------------------------------------------------------------------------------------------------------------

function updatePackageJsonPinnedPackageManager(context: MigrationContext, packageJson: PackageJsonOperations) {
    const settings = {
        npm: { swpm: "npm" },
        pnpm: { swpm: "pnpm" },
        yarn: { swpm: "yarn@berry" },
    } as const;
    packageJson.json = { ...packageJson.json, ...settings[context.newConfig.packageManager.value] };
}
