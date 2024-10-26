import { COMMAND_LINE_OPTIONS } from "./command-line-options";
import {
    createBooleanProperty,
    createEnumSetProperty,
    createIntegerProperty,
    createNonPinnableEnumProperty,
    createPinnableEnumProperty,
    createStringProperty,
    createVersionProperty,
} from "./config-descriptor-factories";
import { createDirectoryParser, parseProjectName } from "./config-parsers";

const WEB_APP_DIRECTORY = "web app directory";
const BUNDLER_OUTPUT_DIRECTORY = "bundler output directory";
const SOURCE_DIRECTORY = "source directory";
const TYPESCRIPT_OUTPUT_DIRECTORY = "TypeScript output directory";

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
            currentKey: "LP_CFG_ARTIFACT",
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
            currentKey: "LP_CFG_BUNDLER",
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
        name: BUNDLER_OUTPUT_DIRECTORY,
        configFile: {
            currentKey: "LP_CFG_BUNDLER_OUT_DIR",
            newConfigObjectName: "bundlerOutDir",
            comment: "only applicable if bundling is enabled",
        },
        commandLine: {
            option: "--bundler-out-dir",
            placeholder: "<DIR>",
            description: BUNDLER_OUTPUT_DIRECTORY,
        },
        parseOldValue: createDirectoryParser(BUNDLER_OUTPUT_DIRECTORY, "optional"),
        parseNewValue: createDirectoryParser(BUNDLER_OUTPUT_DIRECTORY, "optional"),
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
            currentKey: "LP_CFG_DTS_BUNDLER",
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
    //   ########  #######   ########   ##     ##     ###   ######## ######## ######## ########
    //   ##       ##     ##  ##     ##  ###   ###    ## ##     ##       ##    ##       ##     ##
    //   ##       ##     ##  ##     ##  #### ####   ##   ##    ##       ##    ##       ##     ##
    //   ######   ##     ##  ########   ## ### ##  ##     ##   ##       ##    ######   ########
    //   ##       ##     ##  ##   ##    ##     ##  #########   ##       ##    ##       ##   ##
    //   ##       ##     ##  ##    ##   ##     ##  ##     ##   ##       ##    ##       ##    ##
    //   ##        #######   ##     ##  ##     ##  ##     ##   ##       ##    ######## ##     ##
    //
    //------------------------------------------------------------------------------------------------------------------

    formatter: createPinnableEnumProperty({
        name: "formatter",
        configFile: {
            currentKey: "LP_CFG_FORMATTER",
            newConfigObjectName: "formatter",
        },
        commandLine: {
            option: "--formatter",
            description: "Code formatter",
        },
        currentValues: [
            ["prettier", undefined],
            ["biome", undefined],
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
            currentKey: "LP_CFG_INSTALLATION_MODE",
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
            currentKey: "LP_CFG_MODULE_SYSTEM",
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
            currentKey: "LP_CFG_PACKAGE_MANAGER",
            newConfigObjectName: "packageManager",
        },
        commandLine: {
            option: "--package-manager",
            description: "Package manager",
        },
        currentValues: [
            ["npm", undefined],
            ["pnpm", "use globally pre-installed pnpm"],
            ["yarn", "locally installed Yarn without Plug'n'Play (requires a globally pre-installed Yarn Classic)"],
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
            currentKey: "LP_CFG_PROJECT_NAME",
            newConfigObjectName: "projectName",
            comment: "the main module's file name",
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
            currentKey: "LP_CFG_RUNTIME",
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
        name: SOURCE_DIRECTORY,
        configFile: {
            currentKey: "LP_CFG_SRC_DIR",
            newConfigObjectName: "srcDir",
        },
        commandLine: {
            option: "--src-dir",
            placeholder: "<DIR>",
            description: "Relative path to the source directory",
        },
        parseOldValue: createDirectoryParser(SOURCE_DIRECTORY, "mandatory"),
        parseNewValue: createDirectoryParser(SOURCE_DIRECTORY, "mandatory"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########    ###    ########        ######  #### ######## ########
    //      ##      ## ##   ##     ##      ##    ##  ##       ##  ##
    //      ##     ##   ##  ##     ##      ##        ##      ##   ##
    //      ##    ##     ## ########        ######   ##     ##    ######
    //      ##    ######### ##     ##            ##  ##    ##     ##
    //      ##    ##     ## ##     ##      ##    ##  ##   ##      ##
    //      ##    ##     ## ########        ######  #### ######## ########
    //
    //------------------------------------------------------------------------------------------------------------------

    tabSize: createIntegerProperty({
        name: "tab size",
        configFile: {
            currentKey: "LP_CFG_TAB_SIZE",
            newConfigObjectName: "tabSize",
            comment: "only applicable if code formatting is enabled",
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
    //   ######## ########  ######  ########       ########  ##     ## ##    ## ##    ## ######## ########
    //      ##    ##       ##    ##    ##          ##     ## ##     ## ###   ## ###   ## ##       ##     ##
    //      ##    ##       ##          ##          ##     ## ##     ## ####  ## ####  ## ##       ##     ##
    //      ##    ######    ######     ##          ########  ##     ## ## ## ## ## ## ## ######   ########
    //      ##    ##             ##    ##          ##   ##   ##     ## ##  #### ##  #### ##       ##   ##
    //      ##    ##       ##    ##    ##          ##    ##  ##     ## ##   ### ##   ### ##       ##    ##
    //      ##    ########  ######     ##          ##     ##  #######  ##    ## ##    ## ######## ##     ##
    //
    //------------------------------------------------------------------------------------------------------------------

    testRunner: createPinnableEnumProperty({
        name: "test runner",
        configFile: {
            currentKey: "LP_CFG_TEST_RUNNER",
            newConfigObjectName: "testRunner",
        },
        commandLine: {
            option: "--test-runner",
            description: "Test runner",
        },
        currentValues: [
            ["node", "use NodeJS as the test runner"],
            ["disabled", "disable testing"],
        ] as const,
        obsoleteValues: [] as const,
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
        name: TYPESCRIPT_OUTPUT_DIRECTORY,
        configFile: {
            currentKey: "LP_CFG_TSC_OUT_DIR",
            newConfigObjectName: "tscOutDir",
            comment: "directory for compiled JavaScript files",
        },
        commandLine: {
            option: "--tsc-out-dir",
            placeholder: "<DIR>",
            description: "TypeScript compiler output directory",
        },
        parseOldValue: createDirectoryParser(TYPESCRIPT_OUTPUT_DIRECTORY, "optional"),
        parseNewValue: createDirectoryParser(TYPESCRIPT_OUTPUT_DIRECTORY, "optional"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ##     ## ########  ##       #### ######## ########       ########  ######## ########   ######
    //   ##     ## ##     ## ##        ##  ##          ##          ##     ## ##       ##     ## ##    ##
    //   ##     ## ##     ## ##        ##  ##          ##          ##     ## ##       ##     ## ##
    //   ##     ## ########  ##        ##  ######      ##          ##     ## ######   ########   ######
    //   ##     ## ##        ##        ##  ##          ##          ##     ## ##       ##              ##
    //   ##     ## ##        ##        ##  ##          ##          ##     ## ##       ##        ##    ##
    //    #######  ##        ######## #### ##          ##          ########  ######## ##         ######
    //
    //------------------------------------------------------------------------------------------------------------------

    upliftDependencies: createBooleanProperty({
        name: "upgrade all npm packages during uplifts",
        configFile: {
            currentKey: "LP_CFG_UPLIFT_DEPENDENCIES",
            newConfigObjectName: "upliftDependencies",
            comment: "upgrade all npm packages during uplifts",
        },
        commandLine: {
            option: "--uplift-dependencies",
            placeholder: "[true | false]",
            description: "Upgrade all npm packages during uplifts",
        },
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
            currentKey: "LP_CFG_VERSION",
            newConfigObjectName: "version",
        },
    }),

    //------------------------------------------------------------------------------------------------------------------
    //
    //   ##     ##  ######   ######   #######  ########  ########        ######  ########  ######
    //   ##     ## ##    ## ##    ## ##     ## ##     ## ##             ##    ## ##       ##    ##
    //   ##     ## ##       ##       ##     ## ##     ## ##             ##       ##       ##
    //   ##     ##  ######  ##       ##     ## ##     ## ######         ##       ######   ##   ####
    //    ##   ##        ## ##       ##     ## ##     ## ##             ##       ##       ##    ##
    //     ## ##   ##    ## ##    ## ##     ## ##     ## ##             ##    ## ##       ##    ##
    //      ###     ######   ######   #######  ########  ########        ######  ##        ######
    //
    //------------------------------------------------------------------------------------------------------------------

    vsCodeSettings: createEnumSetProperty({
        name: "Manage selected VSCode settings",
        commandLine: {
            option: "--vscode-settings",
            description: "Create settings for VSCode",
        },
        configFile: {
            currentKey: "LP_CFG_VSCODE_SETTINGS",
            newConfigObjectName: "vsCodeSettings",
        },
        currentValues: [
            ["formatter", "use the project's formatter (if it has any)"],
            ["format-on-save", "enabled auto-format"],
            ["future-settings", "manage settings that might be added to launchpad in the future"],
        ] as const,
        obsoleteValues: [] as const,
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
        name: WEB_APP_DIRECTORY,
        configFile: {
            currentKey: "LP_CFG_WEB_APP_DIR",
            newConfigObjectName: "webAppDir",
            comment: "only applicable for web applications",
        },
        commandLine: {
            option: "--web-app-dir",
            placeholder: "<DIR>",
            description: "Relative path to the web application (with the index.html)",
        },
        parseOldValue: createDirectoryParser(WEB_APP_DIRECTORY, "optional"),
        parseNewValue: createDirectoryParser(WEB_APP_DIRECTORY, "mandatory"),
    }),
} as const;

const OBSOLETE_CONFIG_PROPERTIES = {} as const;

//----------------------------------------------------------------------------------------------------------------------
//
//   ##     ## ######## ##       ########  ######## ########   ######
//   ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
//   ##     ## ##       ##       ##     ## ##       ##     ## ##
//   ######### ######   ##       ########  ######   ########   ######
//   ##     ## ##       ##       ##        ##       ##   ##         ##
//   ##     ## ##       ##       ##        ##       ##    ##  ##    ##
//   ##     ## ######## ######## ##        ######## ##     ##  ######
//
//----------------------------------------------------------------------------------------------------------------------

const ALL_CONFIG_PROPERTIES = {
    ...CURRENT_CONFIG_PROPERTIES,
    ...OBSOLETE_CONFIG_PROPERTIES,
    ...COMMAND_LINE_OPTIONS,
} as const;
const CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES = { ...CURRENT_CONFIG_PROPERTIES, ...OBSOLETE_CONFIG_PROPERTIES } as const;
const CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES = {
    ...CURRENT_CONFIG_PROPERTIES,
    ...COMMAND_LINE_OPTIONS,
} as const;

const toArray = <T extends object>(properties: T) => Object.keys(properties).map(key => properties[key as keyof T]);

export const ConfigProperties = {
    ...ALL_CONFIG_PROPERTIES,
    all: ALL_CONFIG_PROPERTIES,
    current: CURRENT_CONFIG_PROPERTIES,
    currentAndInitOnly: CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES,
    currentAndObsolete: CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES,
    initOnly: COMMAND_LINE_OPTIONS,
    obsolete: OBSOLETE_CONFIG_PROPERTIES,
    arrays: {
        all: toArray(ALL_CONFIG_PROPERTIES),
        current: toArray(CURRENT_CONFIG_PROPERTIES),
        currentAndInitOnly: toArray(CURRENT_AND_INIT_ONLY_CONFIG_PROPERTIES),
        currentAndObsolete: toArray(CURRENT_AND_OBSOLETE_CONFIG_PROPERTIES),
        initOnly: toArray(COMMAND_LINE_OPTIONS),
        obsolete: toArray(OBSOLETE_CONFIG_PROPERTIES),
    },
} as const;

export type InitOnlyConfigProperties = keyof typeof COMMAND_LINE_OPTIONS;
