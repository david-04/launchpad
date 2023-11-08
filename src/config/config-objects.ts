import {
    ValidationError,
    type AddError,
    type CommandLineOptions,
    type ConfigError,
    type ConfigFileProperty,
} from "./config-data-types.js";
import { ConfigProperties } from "./config-properties.js";

//----------------------------------------------------------------------------------------------------------------------
// Parse available configuration properties into an old config object
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfig(properties: ReadonlyArray<ConfigFileProperty>, addError: AddError) {
    return {
        version: ConfigProperties.version.parseOldValue(properties, addError),
        projectName: ConfigProperties.projectName.parseOldValue(properties, addError),
        artifact: ConfigProperties.artifact.parseOldValue(properties, addError),
        runtime: ConfigProperties.runtime.parseOldValue(properties, addError),
        module: ConfigProperties.module.parseOldValue(properties, addError),
        installationMode: ConfigProperties.installationMode.parseOldValue(properties, addError),
        bundler: ConfigProperties.bundler.parseOldValue(properties, addError),
        dtsBundler: ConfigProperties.dtsBundler.parseOldValue(properties, addError),
        formatter: ConfigProperties.formatter.parseOldValue(properties, addError),
        tabSize: ConfigProperties.tabSize.parseOldValue(properties, addError),
        packageManager: ConfigProperties.packageManager.parseOldValue(properties, addError),
        srcDir: ConfigProperties.srcDir.parseOldValue(properties, addError),
        webAppDir: ConfigProperties.webAppDir.parseOldValue(properties, addError),
        tscOutDir: ConfigProperties.tscOutDir.parseOldValue(properties, addError),
        bundlerOutDir: ConfigProperties.bundlerOutDir.parseOldValue(properties, addError),
    } as const satisfies { [K in keyof typeof ConfigProperties.currentAndObsolete]: unknown };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a validated config that has all mandatory properties
//----------------------------------------------------------------------------------------------------------------------

export function validateConfig(config: ReturnType<typeof assembleConfig>, addError: AddError) {
    try {
        return {
            version: ConfigProperties.version.assertOldValuePresent(config.version),
            projectName: ConfigProperties.projectName.assertOldValuePresent(config.projectName),
            artifact: ConfigProperties.artifact.assertOldValuePresent(config.artifact),
            runtime: ConfigProperties.runtime.assertOldValuePresent(config.runtime),
            module: ConfigProperties.module.assertOldValuePresent(config.module),
            installationMode: ConfigProperties.installationMode.assertOldValuePresent(config.installationMode),
            bundler: ConfigProperties.bundler.assertOldValuePresent(config.bundler),
            dtsBundler: ConfigProperties.dtsBundler.assertOldValuePresent(config.dtsBundler),
            formatter: ConfigProperties.formatter.assertOldValuePresent(config.formatter),
            tabSize: ConfigProperties.tabSize.assertOldValuePresent(config.tabSize),
            packageManager: ConfigProperties.packageManager.assertOldValuePresent(config.packageManager),
            srcDir: ConfigProperties.srcDir.assertOldValuePresent(config.srcDir),
            webAppDir: ConfigProperties.webAppDir.assertOldValuePresent(config.webAppDir),
            tscOutDir: ConfigProperties.tscOutDir.assertOldValuePresent(config.tscOutDir),
            bundlerOutDir: ConfigProperties.bundlerOutDir.assertOldValuePresent(config.tscOutDir),
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

export type OldPartialConfig = ReturnType<typeof assembleConfig>;
export type OldConfig = ReturnType<typeof validateConfig>;

type NewConfigType<T extends keyof typeof ConfigProperties.currentAndInitOnly> = Exclude<
    ReturnType<(typeof ConfigProperties.currentAndInitOnly)[T]["parseNewValue"]>,
    ConfigError
>;

export type NewConfig = {
    version: NewConfigType<"version">;
    projectName: NewConfigType<"projectName">;
    artifact: NewConfigType<"artifact">;
    runtime: NewConfigType<"runtime">;
    installationMode: NewConfigType<"installationMode">;
    module: NewConfigType<"module">;
    bundler: NewConfigType<"bundler">;
    dtsBundler: NewConfigType<"dtsBundler">;
    formatter: NewConfigType<"formatter">;
    tabSize: NewConfigType<"tabSize">;
    packageManager: NewConfigType<"packageManager">;
    srcDir: NewConfigType<"srcDir">;
    webAppDir: NewConfigType<"webAppDir">;
    tscOutDir: NewConfigType<"tscOutDir">;
    bundlerOutDir: NewConfigType<"bundlerOutDir">;
    installDevDependencies: NewConfigType<"installDevDependencies">;
    dependencies: NewConfigType<"dependencies">;
    createProjectTemplate: NewConfigType<"createProjectTemplate">;
    createDebugModule: NewConfigType<"createDebugModule">;
};

export type NewConfigCli = Omit<NewConfig, "runtime"> & {
    runtimeCli: NewConfigType<"runtimeCli">;
    preselectedDependencies: NewConfigType<"preselectedDependencies">;
    optionalDependencies: NewConfigType<"optionalDependencies">;
};

export type CommandLineConfig = ReturnType<typeof assembleConfigFromCommandLineOptions>;

//----------------------------------------------------------------------------------------------------------------------
// Parse configuration properties into an old config object
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfigFromCommandLineOptions(properties: CommandLineOptions) {
    return {
        projectName: ConfigProperties.projectName.parseFromCommandLine(properties),
        artifact: ConfigProperties.artifact.parseFromCommandLine(properties),
        runtimeCli: ConfigProperties.runtimeCli.parseFromCommandLine(properties),
        module: ConfigProperties.module.parseFromCommandLine(properties),
        installationMode: ConfigProperties.installationMode.parseFromCommandLine(properties),
        bundler: ConfigProperties.bundler.parseFromCommandLine(properties),
        dtsBundler: ConfigProperties.dtsBundler.parseFromCommandLine(properties),
        formatter: ConfigProperties.formatter.parseFromCommandLine(properties),
        tabSize: ConfigProperties.tabSize.parseFromCommandLine(properties),
        packageManager: ConfigProperties.packageManager.parseFromCommandLine(properties),
        srcDir: ConfigProperties.srcDir.parseFromCommandLine(properties),
        webAppDir: ConfigProperties.webAppDir.parseFromCommandLine(properties),
        tscOutDir: ConfigProperties.tscOutDir.parseFromCommandLine(properties),
        bundlerOutDir: ConfigProperties.bundlerOutDir.parseFromCommandLine(properties),
        installDevDependencies: ConfigProperties.installDevDependencies.parseFromCommandLine(properties),
        dependencies: ConfigProperties.dependencies.parseFromCommandLine(properties),
        preselectedDependencies: ConfigProperties.preselectedDependencies.parseFromCommandLine(properties),
        optionalDependencies: ConfigProperties.optionalDependencies.parseFromCommandLine(properties),
        createProjectTemplate: ConfigProperties.createProjectTemplate.parseFromCommandLine(properties),
        createDebugModule: ConfigProperties.createDebugModule.parseFromCommandLine(properties),
    } as const satisfies Omit<{ [K in keyof NewConfigCli]: NewConfigCli[K] | undefined | "default" }, "version">;
}
