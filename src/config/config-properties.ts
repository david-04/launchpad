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
            currentKey: "LP_SETTINGS_MODULE_SYSTEM",
            newConfigObjectName: "module",
        },
        commandLine: {
            option: "--module-type",
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

export const ObsoleteConfigProperties = {} as const;

//----------------------------------------------------------------------------------------------------------------------
// Merge current and obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

const AllConfigProperties = { ...CurrentConfigProperties, ...ObsoleteConfigProperties } as const;
const all = Object.keys(AllConfigProperties).map(key => AllConfigProperties[key as keyof typeof AllConfigProperties]);
export const ConfigProperties = { ...AllConfigProperties, all } as const;
