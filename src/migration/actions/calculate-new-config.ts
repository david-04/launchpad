import { pinned } from "../../config/config-data-types";
import type { NewConfig, OldConfig } from "../../config/config-objects";
import { DEFAULT_FORMATTER, DEFAULT_PACKAGE_MANAGER } from "../../config/default-config-values";
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
        dependencies: [],
        dtsBundler: oldConfig.dtsBundler,
        formatter: calculateNewFormatter(oldConfig),
        installationMode: oldConfig.installationMode,
        installDevDependencies: packageJson.containsTypeScriptDependency(),
        moduleSystem: oldConfig.moduleSystem,
        packageManager: calculateNewPackageManager(oldConfig),
        projectName: oldConfig.projectName,
        runtime: oldConfig.runtime,
        srcDir: oldConfig.srcDir,
        tabSize: oldConfig.tabSize,
        testRunner: oldConfig.testRunner ?? pinned("disabled"),
        tscOutDir: oldConfig.tscOutDir,
        upliftDependencies: oldConfig.upliftDependencies,
        version: VERSION_NUMBER,
        vsCodeSettings: oldConfig.vsCodeSettings,
        webAppDir: oldConfig.webAppDir,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate the new default package manager
//----------------------------------------------------------------------------------------------------------------------

function calculateNewPackageManager({ packageManager: oldPackageManager }: OldConfig): NewConfig["packageManager"] {
    return oldPackageManager.pinned ? oldPackageManager : DEFAULT_PACKAGE_MANAGER;
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate the new default formatter
//----------------------------------------------------------------------------------------------------------------------

function calculateNewFormatter({ formatter: oldFormatter }: OldConfig): NewConfig["formatter"] {
    return oldFormatter.pinned ? oldFormatter : DEFAULT_FORMATTER;
}
