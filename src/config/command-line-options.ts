import { defaultMightChange } from "../utilities/constants";
import {
    createBooleanProperty,
    createNonPinnableEnumProperty,
    createStringArrayProperty,
} from "./config-descriptor-factories";
import { parseStringArray } from "./config-parsers";

export const COMMAND_LINE_OPTIONS = {
    //
    //------------------------------------------------------------------------------------------------------------------
    //
    //   ########  ######## ########  ######## ##    ## ########  ######## ##    ##  ######  #### ########  ######
    //   ##     ## ##       ##     ## ##       ###   ## ##     ## ##       ###   ## ##    ##  ##  ##       ##    ##
    //   ##     ## ##       ##     ## ##       ####  ## ##     ## ##       ####  ## ##        ##  ##       ##
    //   ##     ## ######   ########  ######   ## ## ## ##     ## ######   ## ## ## ##        ##  ######    ######
    //   ##     ## ##       ##        ##       ##  #### ##     ## ##       ##  #### ##        ##  ##             ##
    //   ##     ## ##       ##        ##       ##   ### ##     ## ##       ##   ### ##    ##  ##  ##       ##    ##
    //   ########  ######## ##        ######## ##    ## ########  ######## ##    ##  ######  #### ########  ######
    //
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
    //
    //   ######## ######## ##     ## ########  ##          ###    ######## ########
    //      ##    ##       ###   ### ##     ## ##         ## ##      ##    ##
    //      ##    ##       #### #### ##     ## ##        ##   ##     ##    ##
    //      ##    ######   ## ### ## ########  ##       ##     ##    ##    ######
    //      ##    ##       ##     ## ##        ##       #########    ##    ##
    //      ##    ##       ##     ## ##        ##       ##     ##    ##    ##
    //      ##    ######## ##     ## ##        ######## ##     ##    ##    ########
    //
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
} as const;
