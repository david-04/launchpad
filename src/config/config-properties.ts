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

const CURRENT_CONFIG_PROPERTIES = {
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
            placeholder: "<NAME>",
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
            description: "the project's artifact",
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
            description: "the runtime environment",
        },
        currentValues: [
            ["cli", "currently node, might change during future uplifts"],
            ["node", "command line (pre-compiled to JavaScript)"],
            ["ts-node", "command line (compile on-the-fly when executing)"],
            ["web", "web browser"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Module
    //------------------------------------------------------------------------------------------------------------------

    module: createNonPinnableEnumProperty({
        name: "module system",
        configFile: {
            currentKey: "LP_SETTINGS_MODULE_SYSTEM",
            newConfigObjectName: "module",
        },
        commandLine: {
            option: "--module-system",
            description: "the target module system",
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
            currentKey: "LP_SETTINGS_DTS_BUNDLER",
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

const OBSOLETE_CONFIG_PROPERTIES = {} as const;

//----------------------------------------------------------------------------------------------------------------------
// Create compilations of the configuration properties
//----------------------------------------------------------------------------------------------------------------------

const ALL_CONFIG_PROPERTIES = { ...CURRENT_CONFIG_PROPERTIES, ...OBSOLETE_CONFIG_PROPERTIES } as const;

const toArray = <T extends object>(properties: T) => Object.keys(properties).map(key => properties[key as keyof T]);

export const ConfigProperties = {
    ...ALL_CONFIG_PROPERTIES,
    all: ALL_CONFIG_PROPERTIES,
    current: CURRENT_CONFIG_PROPERTIES,
    obsolete: OBSOLETE_CONFIG_PROPERTIES,
    arrays: {
        all: toArray(ALL_CONFIG_PROPERTIES),
        current: toArray(CURRENT_CONFIG_PROPERTIES),
        obsolete: toArray(OBSOLETE_CONFIG_PROPERTIES),
    },
} as const;
