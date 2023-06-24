import {
    ValidationError,
    type AddError,
    type ConfigError,
    type ConfigFileProperty,
    type CommandLineOptions,
} from "./config-data-types.js";
import {
    createNonPinnableEnumProperty,
    createPinnableEnumProperty,
    createStringProperty,
    createVersionProperty,
} from "./config-descriptor-factories.js";
import { createDirectoryParser, parseProjectName } from "./config-parsers.js";

//----------------------------------------------------------------------------------------------------------------------
// Current configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const CurrentConfigProperties = {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Version number
    //------------------------------------------------------------------------------------------------------------------

    version: createVersionProperty({
        name: "version number",
        configFile: {
            currentKey: "LP_SETTINGS_VERSION",
            newConfigObjectName: "version",
        },
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Project name
    //------------------------------------------------------------------------------------------------------------------

    projectName: createStringProperty({
        name: "project name",
        configFile: {
            currentKey: "LP_SETTINGS_PROJECT_NAME",
            newConfigObjectName: "projectName",
        },
        commandLine: {
            option: "--project-name",
            placeholder: "[<NAME> | default]",
            description: "name of the main module",
        },
        parseOldValue: parseProjectName,
        parseNewValue: parseProjectName,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Artifact
    //------------------------------------------------------------------------------------------------------------------

    artifact: createNonPinnableEnumProperty({
        name: "artifact",
        configFile: {
            currentKey: "LP_SETTINGS_ARTIFACT",
            newConfigObjectName: "artifact",
        },
        commandLine: {
            option: "--artifact",
            description: "the module type",
        },
        currentValues: [
            ["app", "a stand-alone application"],
            ["lib", "a library with typings"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Runtime
    //------------------------------------------------------------------------------------------------------------------

    runtime: createNonPinnableEnumProperty({
        name: "runtime environment",
        configFile: {
            currentKey: "LP_SETTINGS_RUNTIME",
            newConfigObjectName: "runtime",
        },
        commandLine: {
            option: "--runtime",
            description: "the runtime engine/environment",
        },
        currentValues: [
            ["node", "command line (compiled to JavaScript)"],
            ["ts-node", "command line (run TypeScript without compiling)"],
            ["web", "run in browser"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Module
    //------------------------------------------------------------------------------------------------------------------

    module: createNonPinnableEnumProperty({
        name: "module type",
        configFile: {
            currentKey: "LP_SETTINGS_MODULE",
            newConfigObjectName: "module",
        },
        commandLine: {
            option: "--module",
            description: "the module type",
        },
        currentValues: [
            ["cjs", "CommonJS"],
            ["esm", "ECMAScript modules"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Bundler
    //------------------------------------------------------------------------------------------------------------------

    bundler: createPinnableEnumProperty({
        name: "bundler",
        configFile: {
            currentKey: "LP_SETTINGS_BUNDLER",
            newConfigObjectName: "bundler",
        },
        commandLine: {
            option: "--bundler",
            description: "the bundler",
        },
        currentValues: [["esbuild"], ["disabled", "don't use bundling"]] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // DTS Bundler
    //------------------------------------------------------------------------------------------------------------------

    dtsBundler: createPinnableEnumProperty({
        name: "d.ts bundler",
        configFile: {
            currentKey: "LP_SETTINGS_BUNDLER_DTS",
            newConfigObjectName: "dtsBundler",
        },
        commandLine: {
            option: "--dts-bundler",
            description: "the declaration bundler for d.ts files",
        },
        currentValues: [["dts-bundle-generator"], ["disabled", "don't bundle declaration files"]] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Formatter
    //------------------------------------------------------------------------------------------------------------------

    formatter: createPinnableEnumProperty({
        name: "formatter",
        configFile: {
            currentKey: "LP_SETTINGS_FORMATTER",
            newConfigObjectName: "formatter",
        },
        commandLine: {
            option: "--formatter",
            description: "the code formatter",
        },
        currentValues: [["prettier"], ["rome"], ["disabled", "don't format sources"]] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Package manager
    //------------------------------------------------------------------------------------------------------------------

    packageManager: createPinnableEnumProperty({
        name: "package manager",
        configFile: {
            currentKey: "LP_SETTINGS_PACKAGE_MANAGER",
            newConfigObjectName: "packageManager",
        },
        commandLine: {
            option: "--package-manager",
            description: "the Node package manager",
        },
        currentValues: [["npm"], ["pnpm"], ["yarn"]] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Source directory
    //------------------------------------------------------------------------------------------------------------------

    srcDir: createStringProperty({
        name: "source directory",
        configFile: {
            currentKey: "LP_SETTINGS_SRC_DIR",
            newConfigObjectName: "srcDir",
        },
        commandLine: {
            option: "--src-dir",
            placeholder: "<DIR>",
            description: "relative path to the source directory",
        },
        parseOldValue: createDirectoryParser("source directory", "mandatory"),
        parseNewValue: createDirectoryParser("source directory", "mandatory"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    // TSC output directory
    //------------------------------------------------------------------------------------------------------------------

    tscOutDir: createStringProperty({
        name: "TypeScript output directory",
        configFile: {
            currentKey: "LP_SETTINGS_TSC_OUT_DIR",
            newConfigObjectName: "tscOutDir",
        },
        commandLine: {
            option: "--tsc-out-dir",
            placeholder: "<DIR>",
            description: "TypeScript compiler output directory",
        },
        parseOldValue: createDirectoryParser("TypeScript output directory", "optional"),
        parseNewValue: createDirectoryParser("TypeScript output directory", "optional"),
    }),
} as const;

//----------------------------------------------------------------------------------------------------------------------
// Obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const ObsoleteConfigProperties = {} as const;

//----------------------------------------------------------------------------------------------------------------------
// Merge current and obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

const AllConfigProperties = { ...CurrentConfigProperties, ...ObsoleteConfigProperties } as const;
const all = Object.keys(AllConfigProperties).map(key => AllConfigProperties[key as keyof typeof AllConfigProperties]);
export const ConfigProperties = { ...AllConfigProperties, all } as const;

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
        bundler: ConfigProperties.bundler.parseOldValue(properties, addError),
        dtsBundler: ConfigProperties.dtsBundler.parseOldValue(properties, addError),
        formatter: ConfigProperties.formatter.parseOldValue(properties, addError),
        packageManager: ConfigProperties.packageManager.parseOldValue(properties, addError),
        srcDir: ConfigProperties.srcDir.parseOldValue(properties, addError),
        tscOutDir: ConfigProperties.tscOutDir.parseOldValue(properties, addError),
    } as const satisfies { [K in keyof typeof CurrentConfigProperties]: unknown };
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
            bundler: ConfigProperties.bundler.assertOldValuePresent(config.bundler),
            dtsBundler: ConfigProperties.dtsBundler.assertOldValuePresent(config.dtsBundler),
            formatter: ConfigProperties.formatter.assertOldValuePresent(config.formatter),
            packageManager: ConfigProperties.packageManager.assertOldValuePresent(config.packageManager),
            srcDir: ConfigProperties.srcDir.assertOldValuePresent(config.srcDir),
            tscOutDir: ConfigProperties.tscOutDir.assertOldValuePresent(config.tscOutDir),
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

type NewConfigType<T extends keyof typeof CurrentConfigProperties> = Exclude<
    ReturnType<(typeof CurrentConfigProperties)[T]["parseNewValue"]>,
    ConfigError
>;

export type NewConfig = {
    version: NewConfigType<"version">;
    projectName: NewConfigType<"projectName">;
    artifact: NewConfigType<"artifact">;
    runtime: NewConfigType<"runtime">;
    module: NewConfigType<"module">;
    bundler: NewConfigType<"bundler">;
    dtsBundler: NewConfigType<"dtsBundler">;
    formatter: NewConfigType<"formatter">;
    packageManager: NewConfigType<"packageManager">;
    srcDir: NewConfigType<"srcDir">;
    tscOutDir: NewConfigType<"tscOutDir">;
};

export type CommandLineConfig = ReturnType<typeof assembleConfigFromCommandLineOptions>;

//----------------------------------------------------------------------------------------------------------------------
// Parse configuration properties into an old config object
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfigFromCommandLineOptions(properties: CommandLineOptions) {
    return {
        projectName: ConfigProperties.projectName.parseFromCommandLine(properties),
        artifact: ConfigProperties.artifact.parseFromCommandLine(properties),
        runtime: ConfigProperties.runtime.parseFromCommandLine(properties),
        module: ConfigProperties.module.parseFromCommandLine(properties),
        bundler: ConfigProperties.bundler.parseFromCommandLine(properties),
        dtsBundler: ConfigProperties.dtsBundler.parseFromCommandLine(properties),
        formatter: ConfigProperties.formatter.parseFromCommandLine(properties),
        packageManager: ConfigProperties.packageManager.parseFromCommandLine(properties),
        srcDir: ConfigProperties.srcDir.parseFromCommandLine(properties),
        tscOutDir: ConfigProperties.tscOutDir.parseFromCommandLine(properties),
    } as const satisfies Omit<{ [K in keyof NewConfig]: NewConfig[K] | undefined | "default" }, "version">;
}
