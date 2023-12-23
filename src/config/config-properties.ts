import { defaultMightChange } from "../utilities/constants";
import {
    createBooleanProperty,
    createIntegerProperty,
    createNonPinnableEnumProperty,
    createPinnableEnumProperty,
    createStringArrayProperty,
    createStringProperty,
    createVersionProperty,
} from "./config-descriptor-factories";
import { createDirectoryParser, parseProjectName, parseStringArray } from "./config-parsers";

const CURRENT_CONFIG_PROPERTIES = {
    //
    //------------------------------------------------------------------------------------------------------------------
    //
    //      ###    ########  ######## #### ########    ###     ######  ########
    //     ## ##   ##     ##    ##     ##  ##         ## ##   ##    ##    ##
    //    ##   ##  ##     ##    ##     ##  ##        ##   ##  ##          ##
    //   ##     ## ########     ##     ##  ######   ##     ## ##          ##
    //   ######### ##   ##      ##     ##  ##       ######### ##          ##
    //   ##     ## ##    ##     ##     ##  ##       ##     ## ##    ##    ##
    //   ##     ## ##     ##    ##    #### ##       ##     ##  ######     ##
    //
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
            placeholder: "[app | lib]",
        },
        currentValues: [
            ["app", "a stand-alone application"],
            ["lib", "a library with typings"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########  ##     ## ##    ## ########  ##       ######## ########
    //   ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##
    //   ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##
    //   ########  ##     ## ## ## ## ##     ## ##       ######   ########
    //   ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##
    //   ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##
    //   ########   #######  ##    ## ########  ######## ######## ##     ##
    //
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
    //
    // ########  ##     ## ##    ## ########  ##       ######## ########          ########  #### ########
    // ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##         ##     ##  ##  ##     ##
    // ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##         ##     ##  ##  ##     ##
    // ########  ##     ## ## ## ## ##     ## ##       ######   ########          ##     ##  ##  ########
    // ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##           ##     ##  ##  ##   ##
    // ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##          ##     ##  ##  ##    ##
    // ########   #######  ##    ## ########  ######## ######## ##     ##         ########  #### ##     ##
    //
    //------------------------------------------------------------------------------------------------------------------

    bundlerOutDir: createStringProperty({
        name: "bundler output directory",
        configFile: {
            currentKey: "LP_SETTINGS_BUNDLER_OUT_DIR",
            newConfigObjectName: "bundlerOutDir",
        },
        commandLine: {
            option: "--bundler-out-dir",
            placeholder: "<DIR>",
            description: "Bundler output directory",
        },
        parseOldValue: createDirectoryParser("bundler output directory", "optional"),
        parseNewValue: createDirectoryParser("bundler output directory", "optional"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########  ########  ######         ########  ##     ## ##    ## ########  ##       ######## ########
    //   ##     ##    ##    ##    ##        ##     ## ##     ## ###   ## ##     ## ##       ##       ##     ##
    //   ##     ##    ##    ##              ##     ## ##     ## ####  ## ##     ## ##       ##       ##     ##
    //   ##     ##    ##     ######         ########  ##     ## ## ## ## ##     ## ##       ######   ########
    //   ##     ##    ##          ##        ##     ## ##     ## ##  #### ##     ## ##       ##       ##   ##
    //   ##     ##    ##    ##    ##        ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##
    //   ########     ##     ######         ########   #######  ##    ## ########  ######## ######## ##     ##
    //
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
    //
    //   ########  #######  ########  ##     ##    ###    ######## ######## ######## ########
    //   ##       ##     ## ##     ## ###   ###   ## ##      ##       ##    ##       ##     ##
    //   ##       ##     ## ##     ## #### ####  ##   ##     ##       ##    ##       ##     ##
    //   ######   ##     ## ########  ## ### ## ##     ##    ##       ##    ######   ########
    //   ##       ##     ## ##   ##   ##     ## #########    ##       ##    ##       ##   ##
    //   ##       ##     ## ##    ##  ##     ## ##     ##    ##       ##    ##       ##    ##
    //   ##        #######  ##     ## ##     ## ##     ##    ##       ##    ######## ##     ##
    //
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
    //
    //   #### ##    ##  ######  ########    ###    ##       ##            ##     ##  #######  ########  ########
    //    ##  ###   ## ##    ##    ##      ## ##   ##       ##            ###   ### ##     ## ##     ## ##
    //    ##  ####  ## ##          ##     ##   ##  ##       ##            #### #### ##     ## ##     ## ##
    //    ##  ## ## ##  ######     ##    ##     ## ##       ##            ## ### ## ##     ## ##     ## ######
    //    ##  ##  ####       ##    ##    ######### ##       ##            ##     ## ##     ## ##     ## ##
    //    ##  ##   ### ##    ##    ##    ##     ## ##       ##            ##     ## ##     ## ##     ## ##
    //   #### ##    ##  ######     ##    ##     ## ######## ########      ##     ##  #######  ########  ########
    //
    //------------------------------------------------------------------------------------------------------------------

    installationMode: createNonPinnableEnumProperty({
        name: "launchpad installation mode",
        configFile: {
            currentKey: "LP_SETTINGS_INSTALLATION_MODE",
            newConfigObjectName: "installationMode",
        },
        commandLine: {
            option: "--installation-mode",
            description: "Location of the the launchpad npm package",
            placeholder: "[local | global | temp | npx | pnpm-dlx | yarn-dlx]",
        },
        currentValues: [
            ["local", "install locally within the project"],
            ["global", "use a globally installed version (needs to be kept up-to-date manually)"],
            ["temp", "temporary installation via this project's package manager"],
            ["npx", "temporary installation via npx"],
            ["pnpm-dlx", "temporary installation via pnpm dlx"],
            ["yarn-dlx", "temporary installation via yarn dlx"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ##     ##  #######  ########  ##     ## ##       ########        ######  ##    ##  ######
    //   ###   ### ##     ## ##     ## ##     ## ##       ##             ##    ##  ##  ##  ##    ##
    //   #### #### ##     ## ##     ## ##     ## ##       ##             ##         ####   ##
    //   ## ### ## ##     ## ##     ## ##     ## ##       ######          ######     ##     ######
    //   ##     ## ##     ## ##     ## ##     ## ##       ##                   ##    ##          ##
    //   ##     ## ##     ## ##     ## ##     ## ##       ##             ##    ##    ##    ##    ##
    //   ##     ##  #######  ########   #######  ######## ########        ######     ##     ######
    //
    //------------------------------------------------------------------------------------------------------------------

    moduleSystem: createNonPinnableEnumProperty({
        name: "module system",
        configFile: {
            currentKey: "LP_SETTINGS_MODULE_SYSTEM",
            newConfigObjectName: "moduleSystem",
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
    //
    //   ########     ###     ######  ##    ##    ###     ######   ########       ##     ##  ######   ########
    //   ##     ##   ## ##   ##    ## ##   ##    ## ##   ##    ##  ##             ###   ### ##    ##  ##     ##
    //   ##     ##  ##   ##  ##       ##  ##    ##   ##  ##        ##             #### #### ##        ##     ##
    //   ########  ##     ## ##       #####    ##     ## ##   #### ######         ## ### ## ##   #### ########
    //   ##        ######### ##       ##  ##   ######### ##    ##  ##             ##     ## ##    ##  ##   ##
    //   ##        ##     ## ##    ## ##   ##  ##     ## ##    ##  ##             ##     ## ##    ##  ##    ##
    //   ##        ##     ##  ######  ##    ## ##     ##  ######   ########       ##     ##  ######   ##     ##
    //
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
            ["pnpm", "use globally pre-installed pnpm"],
            ["yarn", "localyl installed Yarn without Plug'n'Play (requires a globally pre-installed Yarn Classic)"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########  ########   #######        ## ########  ######  ########    ##    ##    ###    ##     ## ########
    //   ##     ## ##     ## ##     ##       ## ##       ##    ##    ##       ###   ##   ## ##   ###   ### ##
    //   ##     ## ##     ## ##     ##       ## ##       ##          ##       ####  ##  ##   ##  #### #### ##
    //   ########  ########  ##     ##       ## ######   ##          ##       ## ## ## ##     ## ## ### ## ######
    //   ##        ##   ##   ##     ## ##    ## ##       ##          ##       ##  #### ######### ##     ## ##
    //   ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##       ##   ### ##     ## ##     ## ##
    //   ##        ##     ##  #######   ######  ########  ######     ##       ##    ## ##     ## ##     ## ########
    //
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
    //
    //   ########  ##     ## ##    ## ######## #### ##     ## ########
    //   ##     ## ##     ## ###   ##    ##     ##  ###   ### ##
    //   ##     ## ##     ## ####  ##    ##     ##  #### #### ##
    //   ########  ##     ## ## ## ##    ##     ##  ## ### ## ######
    //   ##   ##   ##     ## ##  ####    ##     ##  ##     ## ##
    //   ##    ##  ##     ## ##   ###    ##     ##  ##     ## ##
    //   ##     ##  #######  ##    ##    ##    #### ##     ## ########
    //
    //------------------------------------------------------------------------------------------------------------------

    runtime: createPinnableEnumProperty({
        name: "runtime environment",
        configFile: {
            currentKey: "LP_SETTINGS_RUNTIME",
            newConfigObjectName: "runtime",
        },
        currentValues: [
            ["node", "command line"],
            ["web", "web browser"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //    ######   #######  ##     ## ########   ######  ########        ########  #### ########
    //   ##    ## ##     ## ##     ## ##     ## ##    ## ##              ##     ##  ##  ##     ##
    //   ##       ##     ## ##     ## ##     ## ##       ##              ##     ##  ##  ##     ##
    //    ######  ##     ## ##     ## ########  ##       ######          ##     ##  ##  ########
    //         ## ##     ## ##     ## ##   ##   ##       ##              ##     ##  ##  ##   ##
    //   ##    ## ##     ## ##     ## ##    ##  ##    ## ##              ##     ##  ##  ##    ##
    //    ######   #######   #######  ##     ##  ######  ########        ########  #### ##     ##
    //
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
    //
    //   ########    ###    ########         ######  ####  ######  ########
    //      ##      ## ##   ##     ##       ##    ##  ##  ##    ## ##
    //      ##     ##   ##  ##     ##       ##        ##  ##       ##
    //      ##    ##     ## ########         ######   ##   ######  ######
    //      ##    ######### ##     ##             ##  ##        ## ##
    //      ##    ##     ## ##     ##       ##    ##  ##  ##    ## ##
    //      ##    ##     ## ########         ######  ####  ######  ########
    //
    //------------------------------------------------------------------------------------------------------------------

    tabSize: createIntegerProperty({
        name: "tab size",
        configFile: {
            currentKey: "LP_SETTINGS_TAB_SIZE",
            newConfigObjectName: "tabSize",
        },
        commandLine: {
            option: "--tab-size",
            placeholder: "<SIZE>",
            description: "Tab size (for code formatting)",
        },
        range: { min: 2, max: 20 },
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########  ######   ######          #######  ##     ## ########        ########  #### ########
    //      ##    ##    ## ##    ##        ##     ## ##     ##    ##           ##     ##  ##  ##     ##
    //      ##    ##       ##              ##     ## ##     ##    ##           ##     ##  ##  ##     ##
    //      ##     ######  ##              ##     ## ##     ##    ##           ##     ##  ##  ########
    //      ##          ## ##              ##     ## ##     ##    ##           ##     ##  ##  ##   ##
    //      ##    ##    ## ##    ##        ##     ## ##     ##    ##           ##     ##  ##  ##    ##
    //      ##     ######   ######          #######   #######     ##           ########  #### ##     ##
    //
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
    //
    //    ##     ## ######## ########   ######  ####  #######  ##    ##          ##    ##  #######
    //    ##     ## ##       ##     ## ##    ##  ##  ##     ## ###   ##          ###   ## ##     ##
    //    ##     ## ##       ##     ## ##        ##  ##     ## ####  ##          ####  ## ##     ##
    //    ##     ## ######   ########   ######   ##  ##     ## ## ## ##          ## ## ## ##     ##
    //     ##   ##  ##       ##   ##         ##  ##  ##     ## ##  ####          ##  #### ##     ##
    //      ## ##   ##       ##    ##  ##    ##  ##  ##     ## ##   ###          ##   ### ##     ##
    //       ###    ######## ##     ##  ######  ####  #######  ##    ##          ##    ##  #######
    //
    //------------------------------------------------------------------------------------------------------------------

    version: createVersionProperty({
        name: "version number",
        configFile: {
            currentKey: "LP_SETTINGS_VERSION",
            newConfigObjectName: "version",
        },
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ##      ## ######## ########            ###    ########  ########         ########  #### ########
    //   ##  ##  ## ##       ##     ##          ## ##   ##     ## ##     ##        ##     ##  ##  ##     ##
    //   ##  ##  ## ##       ##     ##         ##   ##  ##     ## ##     ##        ##     ##  ##  ##     ##
    //   ##  ##  ## ######   ########         ##     ## ########  ########         ##     ##  ##  ########
    //   ##  ##  ## ##       ##     ##        ######### ##        ##               ##     ##  ##  ##   ##
    //   ##  ##  ## ##       ##     ##        ##     ## ##        ##               ##     ##  ##  ##    ##
    //    ###  ###  ######## ########         ##     ## ##        ##               ########  #### ##     ##
    //
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
        parseOldValue: createDirectoryParser("web app directory", "optional"),
        parseNewValue: createDirectoryParser("web app directory", "mandatory"),
    }),
} as const;

//----------------------------------------------------------------------------------------------------------------------
//
//     ######  ##       ####          #######  ########  ######## ####  #######  ##    ##  ######
//    ##    ## ##        ##          ##     ## ##     ##    ##     ##  ##     ## ###   ## ##    ##
//    ##       ##        ##          ##     ## ##     ##    ##     ##  ##     ## ####  ## ##
//    ##       ##        ##          ##     ## ########     ##     ##  ##     ## ## ## ##  ######
//    ##       ##        ##          ##     ## ##           ##     ##  ##     ## ##  ####       ##
//    ##    ## ##        ##          ##     ## ##           ##     ##  ##     ## ##   ### ##    ##
//     ######  ######## ####          #######  ##           ##    ####  #######  ##    ##  ######
//
//----------------------------------------------------------------------------------------------------------------------

const INIT_ONLY_CONFIG_PROPERTIES = {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Runtime
    //------------------------------------------------------------------------------------------------------------------

    runtimeCli: createNonPinnableEnumProperty({
        name: "runtime environment",
        commandLine: {
            option: "--runtime",
            description: "Runtime environment",
            placeholder: "[cli | node | web]",
        },
        currentValues: [
            ["cli", defaultMightChange("node")],
            ["node", "command line"],
            ["web", "web browser"],
        ] as const,
        obsoleteValues: [] as const,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Dependencies to install
    //------------------------------------------------------------------------------------------------------------------

    installDevDependencies: createBooleanProperty({
        name: "install development tools toggle",
        commandLine: {
            option: "--install-dev-dependencies",
            placeholder: "[true | false]",
            description: "Install development tools (compiler, bundler, formatter, ...) locally",
        },
    }),

    dependencies: createStringArrayProperty({
        name: "auto-selected NPM packages",
        commandLine: {
            option: "--auto-selected-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "NPM packages to install without without prompting",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    preselectedDependencies: createStringArrayProperty({
        name: "pre-selected NPM packages",
        commandLine: {
            option: "--preselected-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "Pre-selected NPM packages offered for installation",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    optionalDependencies: createStringArrayProperty({
        name: "optional NPM packages",
        commandLine: {
            option: "--optional-dependencies",
            placeholder: "<dep1>, <dep2>, ...",
            description: "Optional (non-pre-selected) NPM packages offered for installation",
        },
        parseOldValue: parseStringArray,
        parseNewValue: parseStringArray,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Project template
    //------------------------------------------------------------------------------------------------------------------

    createProjectTemplate: createBooleanProperty({
        name: "project template toggle",
        commandLine: {
            option: "--create-project-template",
            placeholder: "[true | false]",
            description: "Create a basic project template (main module, Makefile, ...)",
        },
    }),

    createDebugModule: createBooleanProperty({
        name: "debug module toggle",
        commandLine: {
            option: "--create-debug-module",
            placeholder: "[true | false]",
            description: "Create a debug.ts file",
        },
    }),

    createMakefile: createBooleanProperty({
        name: "Makefile toggle",
        commandLine: {
            option: "--create-makefile",
            placeholder: "[true | false]",
            description: "Create a template Makefile",
        },
    }),

    createVsCodeSettings: createBooleanProperty({
        name: "VSCode settings toggle",
        commandLine: {
            option: "--create-vscode-settings",
            placeholder: "[true | false]",
            description: "Create settings for VSCode",
        },
    }),
} as const;

const OBSOLETE_CONFIG_PROPERTIES = {} as const;

//----------------------------------------------------------------------------------------------------------------------
//
//       ###     ######   ######  ######## ##     ## ########  ##       ##    ##
//      ## ##   ##    ## ##    ## ##       ###   ### ##     ## ##        ##  ##
//     ##   ##  ##       ##       ##       #### #### ##     ## ##         ####
//    ##     ##  ######   ######  ######   ## ### ## ########  ##          ##
//    #########       ##       ## ##       ##     ## ##     ## ##          ##
//    ##     ## ##    ## ##    ## ##       ##     ## ##     ## ##          ##
//    ##     ##  ######   ######  ######## ##     ## ########  ########    ##
//
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
