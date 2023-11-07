import { defaultMightChange } from "../utilities/constants.js";
import {
    createBooleanProperty,
    createNonPinnableEnumProperty,
    createPinnableEnumProperty,
    createStringArrayProperty,
    createStringProperty,
    createVersionProperty,
} from "./config-descriptor-factories.js";
import { createDirectoryParser, parseProjectName, parseStringArray } from "./config-parsers.js";

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
            description: "Name of the main module/project",
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
            description: "Project type",
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
            description: "Runtime environment",
        },
        currentValues: [
            ["cli", defaultMightChange("node")],
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
            description: "Target module system",
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
            description: "Bundler",
        },
        currentValues: [
            ["esbuild", undefined],
            ["disabled", "don't use bundling"],
        ] as const,
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
            description: "Bundler for declaration files (d.ts)",
        },
        currentValues: [
            ["dts-bundle-generator", undefined],
            ["disabled", "don't bundle declaration files"],
        ] as const,
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
            description: "Code formatter",
        },
        currentValues: [
            ["prettier", undefined],
            ["disabled", "don't format sources"],
        ] as const,
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
            description: "Package manager",
        },
        currentValues: [
            ["npm", undefined],
            ["pnpm", undefined],
            ["yarn", undefined],
        ] as const,
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
            description: "Relative path to the source directory",
        },
        parseOldValue: createDirectoryParser("source directory", "mandatory"),
        parseNewValue: createDirectoryParser("source directory", "mandatory"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Web app directory
    //------------------------------------------------------------------------------------------------------------------

    webAppDir: createStringProperty({
        name: "web app directory",
        configFile: {
            currentKey: "LP_SETTINGS_WEB_APP_DIR",
            newConfigObjectName: "webAppDir",
        },
        commandLine: {
            option: "--web-app-dir",
            placeholder: "<DIR>",
            description: "Relative path to the web application (with the index.html)",
        },
        parseOldValue: createDirectoryParser("web app directory", "mandatory"),
        parseNewValue: createDirectoryParser("web app directory", "mandatory"),
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

    //------------------------------------------------------------------------------------------------------------------
    // Bundler output directory
    //------------------------------------------------------------------------------------------------------------------

    bundlerOutDir: createStringProperty({
        name: "Bundler output directory",
        configFile: {
            currentKey: "LP_SETTINGS_BUNDLER_OUT_DIR",
            newConfigObjectName: "bundlerOutDir",
        },
        commandLine: {
            option: "--bundler-out-dir",
            placeholder: "<DIR>",
            description: "Bundler output directory",
        },
        parseOldValue: createDirectoryParser("Bundler output directory", "optional"),
        parseNewValue: createDirectoryParser("Bundler output directory", "optional"),
    }),
} as const;

//----------------------------------------------------------------------------------------------------------------------
// Parameters that are only needed during initialization
//----------------------------------------------------------------------------------------------------------------------

const INIT_ONLY_CONFIG_PROPERTIES = {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Libraries (npm packages) to install
    //------------------------------------------------------------------------------------------------------------------

    installDevDependencies: createBooleanProperty({
        name: "Install development tools",
        commandLine: {
            option: "--install-dev-dependencies",
            placeholder: "[true | false]",
            description: "Install development tools (compiler, bundler, formatter, ...)",
        },
    }),

    dependencies: createStringArrayProperty({
        name: "NPM packages to install without prompting",
        commandLine: {
            option: "--auto-selected-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "Install these NPM packages (without prompting)",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    preselectedDependencies: createStringArrayProperty({
        name: "Pre-selected NPM packages",
        commandLine: {
            option: "--preselected-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "Suggest these NPM packages (pre-selected)",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    optionalDependencies: createStringArrayProperty({
        name: "Optional NPM packages",
        commandLine: {
            option: "--optional-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "Suggest these NPM packages (not pre-selected)",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Project template
    //------------------------------------------------------------------------------------------------------------------

    createProjectTemplate: createBooleanProperty({
        name: "Create project template",
        commandLine: {
            option: "--create-project-files",
            placeholder: "[true | false]",
            description: "Create a basic project template (main module, Makefile, ...)",
        },
    }),

    createDebugModule: createBooleanProperty({
        name: "Create a debug module",
        commandLine: {
            option: "--create-debug-module",
            placeholder: "[true | false]",
            description: "Create a debug.ts file",
        },
    }),
} as const;

//----------------------------------------------------------------------------------------------------------------------
// Obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

const OBSOLETE_CONFIG_PROPERTIES = {} as const;

//----------------------------------------------------------------------------------------------------------------------
// Create compilations of the configuration properties
//----------------------------------------------------------------------------------------------------------------------

const ALL_CONFIG_PROPERTIES = {
    ...CURRENT_CONFIG_PROPERTIES,
    ...OBSOLETE_CONFIG_PROPERTIES,
    ...INIT_ONLY_CONFIG_PROPERTIES,
} as const;
const CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES = { ...CURRENT_CONFIG_PROPERTIES, ...OBSOLETE_CONFIG_PROPERTIES } as const;
const CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES = {
    ...CURRENT_CONFIG_PROPERTIES,
    ...INIT_ONLY_CONFIG_PROPERTIES,
} as const;

const toArray = <T extends object>(properties: T) => Object.keys(properties).map(key => properties[key as keyof T]);

export const ConfigProperties = {
    ...ALL_CONFIG_PROPERTIES,
    all: ALL_CONFIG_PROPERTIES,
    current: CURRENT_CONFIG_PROPERTIES,
    currentAndInitOnly: CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES,
    currentAndObsolete: CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES,
    initOnly: INIT_ONLY_CONFIG_PROPERTIES,
    obsolete: OBSOLETE_CONFIG_PROPERTIES,
    arrays: {
        all: toArray(ALL_CONFIG_PROPERTIES),
        current: toArray(CURRENT_CONFIG_PROPERTIES),
        currentAndInitOnly: toArray(CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES),
        currentAndObsolete: toArray(CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES),
        initOnly: toArray(INIT_ONLY_CONFIG_PROPERTIES),
        obsolete: toArray(OBSOLETE_CONFIG_PROPERTIES),
    },
} as const;

export type InitOnlyConfigProperties = keyof typeof INIT_ONLY_CONFIG_PROPERTIES;
