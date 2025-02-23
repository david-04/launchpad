import {
    unpinned,
    ValidationError,
    type AddError,
    type CommandLineOptions,
    type ConfigError,
    type ConfigFileProperty,
} from "./config-data-types";
import { ConfigProperties } from "./config-properties";

//----------------------------------------------------------------------------------------------------------------------
// Parse available configuration properties into an old config object
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfig(properties: ReadonlyArray<ConfigFileProperty>, addError: AddError) {
    return {
        artifact: ConfigProperties.artifact.parseOldValue(properties, addError),
        bundler: ConfigProperties.bundler.parseOldValue(properties, addError),
        bundlerOutDir: ConfigProperties.bundlerOutDir.parseOldValue(properties, addError),
        dtsBundler: ConfigProperties.dtsBundler.parseOldValue(properties, addError),
        formatter: ConfigProperties.formatter.parseOldValue(properties, addError),
        installationMode: ConfigProperties.installationMode.parseOldValue(properties, addError),
        moduleSystem: ConfigProperties.moduleSystem.parseOldValue(properties, addError),
        packageManager: ConfigProperties.packageManager.parseOldValue(properties, addError),
        projectName: ConfigProperties.projectName.parseOldValue(properties, addError),
        runtime: ConfigProperties.runtime.parseOldValue(properties, addError),
        srcDir: ConfigProperties.srcDir.parseOldValue(properties, addError),
        tabSize: ConfigProperties.tabSize.parseOldValue(properties, addError),
        testRunner: ConfigProperties.testRunner.parseOldValue(properties, addError),
        tscOutDir: ConfigProperties.tscOutDir.parseOldValue(properties, addError),
        upliftDependencies: ConfigProperties.upliftDependencies.parseOldValue(properties, addError),
        version: ConfigProperties.version.parseOldValue(properties, addError),
        vsCodeSettings: ConfigProperties.vsCodeSettings.parseOldValue(properties, addError),
        webAppDir: ConfigProperties.webAppDir.parseOldValue(properties, addError),
    } as const satisfies { [K in keyof typeof ConfigProperties.currentAndObsolete]: unknown };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a validated config that has all mandatory properties
//----------------------------------------------------------------------------------------------------------------------

export function validateConfig(config: ReturnType<typeof assembleConfig>, addError: AddError) {
    try {
        return {
            artifact: ConfigProperties.artifact.assertOldValuePresent(config.artifact),
            bundler: ConfigProperties.bundler.assertOldValuePresent(config.bundler),
            bundlerOutDir: ConfigProperties.bundlerOutDir.assertOldValuePresent(config.bundlerOutDir),
            dtsBundler: ConfigProperties.dtsBundler.assertOldValuePresent(config.dtsBundler),
            formatter: ConfigProperties.formatter.assertOldValuePresent(config.formatter),
            installationMode: ConfigProperties.installationMode.assertOldValuePresent(config.installationMode),
            moduleSystem: ConfigProperties.moduleSystem.assertOldValuePresent(config.moduleSystem),
            packageManager: ConfigProperties.packageManager.assertOldValuePresent(config.packageManager),
            projectName: ConfigProperties.projectName.assertOldValuePresent(config.projectName),
            runtime: ConfigProperties.runtime.assertOldValuePresent(config.runtime),
            srcDir: ConfigProperties.srcDir.assertOldValuePresent(config.srcDir),
            tabSize: ConfigProperties.tabSize.assertOldValuePresent(config.tabSize),
            testRunner: config.testRunner ?? unpinned("disabled"),
            tscOutDir: ConfigProperties.tscOutDir.assertOldValuePresent(config.tscOutDir),
            upliftDependencies: ConfigProperties.upliftDependencies.assertOldValuePresent(config.upliftDependencies),
            version: ConfigProperties.version.assertOldValuePresent(config.version),
            vsCodeSettings: ConfigProperties.vsCodeSettings.assertOldValuePresent(config.vsCodeSettings),
            webAppDir: ConfigProperties.webAppDir.assertOldValuePresent(config.webAppDir),
        } as const satisfies typeof config;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            addError(error.message);
        } else {
            throw error;
        }
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Datatypes
//----------------------------------------------------------------------------------------------------------------------

export type OldPartialConfig = Exclude<ReturnType<typeof assembleConfig>, undefined>;
export type OldConfig = Exclude<ReturnType<typeof validateConfig>, undefined>;

type NewConfigType<T extends keyof typeof ConfigProperties.currentAndInitOnly> = Exclude<
    ReturnType<(typeof ConfigProperties.currentAndInitOnly)[T]["parseNewValue"]>,
    ConfigError
>;

export type NewConfig = {
    artifact: NewConfigType<"artifact">;
    bundler: NewConfigType<"bundler">;
    bundlerOutDir: NewConfigType<"bundlerOutDir">;
    createDebugModule: NewConfigType<"createDebugModule">;
    createMakefile: NewConfigType<"createMakefile">;
    createProjectTemplate: NewConfigType<"createProjectTemplate">;
    dependencies: NewConfigType<"dependencies">;
    dtsBundler: NewConfigType<"dtsBundler">;
    formatter: NewConfigType<"formatter">;
    installationMode: NewConfigType<"installationMode">;
    installDevDependencies: NewConfigType<"installDevDependencies">;
    moduleSystem: NewConfigType<"moduleSystem">;
    packageManager: NewConfigType<"packageManager">;
    projectName: NewConfigType<"projectName">;
    runtime: NewConfigType<"runtime">;
    srcDir: NewConfigType<"srcDir">;
    tabSize: NewConfigType<"tabSize">;
    testRunner: NewConfigType<"testRunner">;
    tscOutDir: NewConfigType<"tscOutDir">;
    upliftDependencies: NewConfigType<"upliftDependencies">;
    version: NewConfigType<"version">;
    vsCodeSettings: NewConfigType<"vsCodeSettings">;
    webAppDir: NewConfigType<"webAppDir">;
};

export type NewConfigCli = Omit<NewConfig, "runtime"> & {
    optionalDependencies: NewConfigType<"optionalDependencies">;
    preselectedDependencies: NewConfigType<"preselectedDependencies">;
    runtimeCli: NewConfigType<"runtimeCli">;
};

export type CommandLineConfig = ReturnType<typeof assembleConfigFromCommandLineOptions>;

//----------------------------------------------------------------------------------------------------------------------
// Parse configuration properties into an old config object
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfigFromCommandLineOptions(properties: CommandLineOptions) {
    return {
        artifact: ConfigProperties.artifact.parseFromCommandLine(properties),
        bundler: ConfigProperties.bundler.parseFromCommandLine(properties),
        bundlerOutDir: ConfigProperties.bundlerOutDir.parseFromCommandLine(properties),
        createDebugModule: ConfigProperties.createDebugModule.parseFromCommandLine(properties),
        createMakefile: ConfigProperties.createMakefile.parseFromCommandLine(properties),
        createProjectTemplate: ConfigProperties.createProjectTemplate.parseFromCommandLine(properties),
        dependencies: ConfigProperties.dependencies.parseFromCommandLine(properties),
        dtsBundler: ConfigProperties.dtsBundler.parseFromCommandLine(properties),
        formatter: ConfigProperties.formatter.parseFromCommandLine(properties),
        installationMode: ConfigProperties.installationMode.parseFromCommandLine(properties),
        installDevDependencies: ConfigProperties.installDevDependencies.parseFromCommandLine(properties),
        moduleSystem: ConfigProperties.moduleSystem.parseFromCommandLine(properties),
        optionalDependencies: ConfigProperties.optionalDependencies.parseFromCommandLine(properties),
        packageManager: ConfigProperties.packageManager.parseFromCommandLine(properties),
        preselectedDependencies: ConfigProperties.preselectedDependencies.parseFromCommandLine(properties),
        projectName: ConfigProperties.projectName.parseFromCommandLine(properties),
        runtimeCli: ConfigProperties.runtimeCli.parseFromCommandLine(properties),
        srcDir: ConfigProperties.srcDir.parseFromCommandLine(properties),
        tabSize: ConfigProperties.tabSize.parseFromCommandLine(properties),
        testRunner: ConfigProperties.testRunner.parseFromCommandLine(properties),
        tscOutDir: ConfigProperties.tscOutDir.parseFromCommandLine(properties),
        upliftDependencies: ConfigProperties.upliftDependencies.parseFromCommandLine(properties),
        vsCodeSettings: ConfigProperties.vsCodeSettings.parseFromCommandLine(properties),
        webAppDir: ConfigProperties.webAppDir.parseFromCommandLine(properties),
    } as const satisfies Omit<{ [K in keyof NewConfigCli]: NewConfigCli[K] | undefined | "default" }, "version">;
}
