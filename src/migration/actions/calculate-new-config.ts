//----------------------------------------------------------------------------------------------------------------------
// Calculate the target configuration
//----------------------------------------------------------------------------------------------------------------------

import type { NewConfig, OldConfig } from "../../config/config-objects.js";
import { DEFAULT_PACKAGE_MANAGER } from "../../config/default-config-values.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { fail } from "../../utilities/fail.js";
import type { Path } from "../../utilities/path.js";
import type { MigrateOptions } from "../migrate.js";

export function calculateNewConfig(options: MigrateOptions, oldConfig: OldConfig, skippedStep: string[]): NewConfig {
    const packageJson = inspectPackageJson(options.projectRoot);
    return {
        artifact: oldConfig.artifact,
        bundler: oldConfig.bundler,
        bundlerOutDir: oldConfig.bundlerOutDir,
        createDebugModule: false,
        createMakefile: false,
        createProjectTemplate: false,
        createVsCodeSettings: false,
        dependencies: [],
        dtsBundler: oldConfig.dtsBundler,
        formatter: oldConfig.formatter,
        installationMode: oldConfig.installationMode,
        installDevDependencies: packageJson.hasDevDependencies,
        module: oldConfig.module,
        packageManager: getPackageManager(oldConfig.packageManager, options.canRunPackageManagerCommands, skippedStep),
        projectName: oldConfig.projectName,
        runtime: oldConfig.runtime,
        srcDir: oldConfig.srcDir,
        tabSize: oldConfig.tabSize,
        tscOutDir: oldConfig.tscOutDir,
        version: VERSION_NUMBER,
        webAppDir: oldConfig.webAppDir,
    };
}

function inspectPackageJson(projectRoot: Path) {
    const path = projectRoot.child("package.json");
    try {
        const packageJson = path.existsAndIsFile() ? JSON.parse(path.loadFileContents()) : {};
        return {
            hasDevDependencies: !!(packageJson?.dependencies?.typescript || packageJson?.dependencies?.typescript),
        };
    } catch (error) {
        fail(`Failed to load ${path.path}: ${error}`);
    }
}

function getPackageManager(
    oldPackageManager: OldConfig["packageManager"],
    canRunPackageManagerCommands: boolean,
    skippedSteps: string[]
): NewConfig["packageManager"] {
    const defaultPackageManager: NewConfig["packageManager"] = DEFAULT_PACKAGE_MANAGER;
    if (oldPackageManager.pinned || oldPackageManager.value === defaultPackageManager.value) {
        return oldPackageManager;
    } else if (
        [oldPackageManager.value, defaultPackageManager.value].includes("yarn") &&
        !canRunPackageManagerCommands
    ) {
        skippedSteps.push(`Switch package manger from ${oldPackageManager.value} to ${defaultPackageManager.value}`);
        return oldPackageManager;
    } else {
        return defaultPackageManager;
    }
}
