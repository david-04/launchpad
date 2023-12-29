import type { NewConfig, OldConfig } from "../../config/config-objects";
import { DEFAULT_PACKAGE_MANAGER } from "../../config/default-config-values";
import { VERSION_NUMBER } from "../../resources/version-information";
import { File } from "../data/file";
import { PACKAGE_JSON } from "../data/known-files";
import { PackageJsonOperations } from "../files/package-json";
import type { MigrateOptions } from "../migrate";

//----------------------------------------------------------------------------------------------------------------------
// Calculate the target configuration
//----------------------------------------------------------------------------------------------------------------------

export function calculateNewConfig(options: MigrateOptions, oldConfig: OldConfig): NewConfig {
    const packageJson = new PackageJsonOperations(new File(options.projectRoot, PACKAGE_JSON, oldConfig.tabSize));
    return {
        artifact: oldConfig.artifact,
        bundler: oldConfig.bundler,
        bundlerOutDir: oldConfig.bundlerOutDir,
        createDebugModule: false,
        createMakefile: false,
        createProjectTemplate: false,
        vsCodeSettings: new Set(),
        dependencies: [],
        dtsBundler: oldConfig.dtsBundler,
        formatter: oldConfig.formatter,
        installationMode: oldConfig.installationMode,
        installDevDependencies: packageJson.containsTypeScriptDependency(),
        moduleSystem: oldConfig.moduleSystem,
        packageManager: calculateNewPackageManager(oldConfig),
        projectName: oldConfig.projectName,
        runtime: oldConfig.runtime,
        srcDir: oldConfig.srcDir,
        tabSize: oldConfig.tabSize,
        tscOutDir: oldConfig.tscOutDir,
        upliftDependencies: oldConfig.upliftDependencies,
        version: VERSION_NUMBER,
        webAppDir: oldConfig.webAppDir,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate the
//----------------------------------------------------------------------------------------------------------------------

function calculateNewPackageManager(oldConfig: OldConfig): NewConfig["packageManager"] {
    const oldPackageManager = oldConfig.packageManager;
    const defaultPackageManager = DEFAULT_PACKAGE_MANAGER;
    if (oldPackageManager.pinned || oldPackageManager.value === defaultPackageManager.value) {
        return oldPackageManager;
    } else {
        return defaultPackageManager;
    }
}
