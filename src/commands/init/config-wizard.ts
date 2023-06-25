import { exit } from "process";
import { pinned, unpinned } from "../../config/config-data-types.js";
import type { ParsedConfig } from "../../config/config-loader.js";
import type { CommandLineConfig, NewConfig, OldPartialConfig } from "../../config/config-objects.js";
import { ConfigProperties } from "../../config/config-properties.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { DEFAULT_ENUM } from "../../utilities/constants.js";
import type { Path } from "../../utilities/path.js";
import {
    createDefaultOption,
    findNonPinnableMatchingChoice,
    findPinnableMatchingChoice,
    prompt,
    toChoice,
    toPinned,
    toValidator,
    type ChoiceOptions,
} from "./config-wizard-utils.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

// type EnumProperty = { readonly value: string; readonly pinned: boolean };

type Presets = {
    oldConfig: OldPartialConfig | undefined;
    commandLineConfig: CommandLineConfig;
};

//----------------------------------------------------------------------------------------------------------------------
// Acquire the new configuration
//----------------------------------------------------------------------------------------------------------------------

export async function getNewConfig(
    projectRoot: Path,
    parsedConfig: ParsedConfig | undefined,
    commandLineConfig: CommandLineConfig
) {
    const presets = { oldConfig: await extractOldConfig(parsedConfig), commandLineConfig };
    const version = VERSION_NUMBER;
    const projectName = await getProjectName(presets, projectRoot);
    const artifact = await getArtifact(presets);
    const runtime = await getRuntime(presets);
    const module = await getModule(presets);
    const bundler = await getBundler(presets);
    const dtsBundler = await getDtsBundler(presets, bundler);
    const formatter = await getFormatter(presets);
    const packageManager = await getPackageManager(presets);
    // const srcDir = await getSrcDir(oldConfig);
    // const tscOutDir = await getTscOutDir(oldConfig);
    // const libraries = await getLibraries(runtime);
    // const installDevToolsLocally = await getInstallDevToolsLocally();
    return {
        version,
        projectName,
        artifact,
        runtime,
        module,
        bundler,
        dtsBundler,
        formatter,
        packageManager,
        // srcDir,
        // tscOutDir,
        // libraries,
        // installDevToolsLocally,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Extract the old configuration and confirm any errors that might have occurred
//----------------------------------------------------------------------------------------------------------------------

async function extractOldConfig(parsedConfig: ParsedConfig | undefined) {
    if (parsedConfig) {
        const { partial, errors } = parsedConfig;
        if (errors && errors.length) {
            console.log(`Invalid configuration in ${parsedConfig.configFile}:`);
            errors.forEach(error => console.log(1 < errors.length ? `- ${error}` : error));
            console.log("");
            const choices = toChoice([
                ["yes", "Reconfigure the project anyway", true],
                ["no", "Abort the configuration wizard", false],
            ]);
            const message = "Proceed despite errors?";
            if (!(await prompt<boolean>({ type: "select", hint: " ", message, choices, initial: 0 }))) {
                exit(1);
            }
        }
        return partial;
    } else {
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the project's name
//----------------------------------------------------------------------------------------------------------------------

async function getProjectName(presets: Presets, projectRoot: Path) {
    const defaultName = presets.oldConfig?.projectName?.trim() || projectRoot.path.replace(/.*\//, "").trim();
    const preselectedName = presets.commandLineConfig.projectName;
    if (undefined !== preselectedName) {
        return DEFAULT_ENUM === preselectedName ? defaultName : preselectedName;
    }
    return prompt<string>({
        type: "text",
        initial: defaultName,
        message: "Project name",
        format: input => input.trim(),
        validate: toValidator(ConfigProperties.projectName.parseNewValue),
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the artifact type
//----------------------------------------------------------------------------------------------------------------------

async function getArtifact(presets: Presets) {
    const FIELD = "artifact";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = "app";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties[FIELD].options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Artifact", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the runtime
//----------------------------------------------------------------------------------------------------------------------

async function getRuntime(presets: Presets) {
    const FIELD = "runtime";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = "cli";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties[FIELD].options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Runtime", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the module system
//----------------------------------------------------------------------------------------------------------------------

async function getModule(presets: Presets) {
    const FIELD = "module";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = "esm";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties[FIELD].options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Module system", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler
//----------------------------------------------------------------------------------------------------------------------

async function getBundler(presets: Presets) {
    const FIELD = "bundler";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = unpinned("esbuild");
    const preselectedValue: T = pinned("disabled");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties[FIELD].options.map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, preselectedValue);
        return prompt<T>({ type: "select", message: "Bundler", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the DTS bundler
//----------------------------------------------------------------------------------------------------------------------

async function getDtsBundler(presets: Presets, bundler: NewConfig["bundler"]) {
    const FIELD = "dtsBundler";
    type T = NewConfig[typeof FIELD];
    if ("disabled" === bundler.value) {
        return pinned("disabled");
    }
    const defaultValue: T = unpinned("dts-bundle-generator");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties[FIELD].options.map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "DTS bundler", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler
//----------------------------------------------------------------------------------------------------------------------

async function getFormatter(presets: Presets) {
    const FIELD = "formatter";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = unpinned("prettier");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties[FIELD].options.map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Formatter", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the package manager
//----------------------------------------------------------------------------------------------------------------------

async function getPackageManager(presets: Presets) {
    const FIELD = "packageManager";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = unpinned("npm");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties[FIELD].options.map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Formatter", choices, initial });
    }
}

// //----------------------------------------------------------------------------------------------------------------------
// // Get the source directory
// //----------------------------------------------------------------------------------------------------------------------

// async function getSrcDir(oldConfig: OldConfig | undefined) {
//     const message = "The path must be a valid relative path and not contain blanks or special characters";
//     return prompt<string>({
//         type: "text",
//         initial: oldConfig?.srcDir?.trim() || "src",
//         message: "Source directory",
//         format: input => input.trim().replace(/^\.\//g, "").replace(/\/+$/, "").replace(/\\/g, "/"),
//         validate: value => (!!value.match(/^[^:*?<> \s]+$/) && !value.match(/^(\/|[a-z]:)/i)) || message,
//     });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Get the output directory for transpiled JavaScript files
// //----------------------------------------------------------------------------------------------------------------------

// async function getTscOutDir(oldConfig: OldConfig | undefined) {
//     const message = "The path must be a valid relative path and not contain blanks or special characters";
//     return prompt<string>({
//         type: "text",
//         initial: oldConfig?.tscOutDir?.trim() || "build",
//         message: "tsc output directory",
//         format: input => input.trim().replace(/^\.\//g, "").replace(/\/+$/, "").replace(/\\/g, "/"),
//         validate: value => (!!value.match(/^[^:*?<> \s]+$/) && !value.match(/^(\/|[a-z]:)/i)) || message,
//     });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Select libraries to install
// //----------------------------------------------------------------------------------------------------------------------

// async function getLibraries(runtime: Runtime) {
//     const choices = toChoice([
//         "@types/node",
//         "Typings for Node.js",
//         "@types/node" satisfies Library,
//         runtime.value !== "web",
//     ]);
//     return prompt<ReadonlyArray<Library>>({
//         type: "multiselect",
//         message: "Libraries",
//         choices,
//         instructions: false,
//         hint: "Use [SPACE] to select/deselect",
//     });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Select if development tools are to be installed locally
// //----------------------------------------------------------------------------------------------------------------------

// async function getInstallDevToolsLocally() {
//     const choices = toChoice(
//         ["install locally", "Install compiler/bundler/formatter locally", true],
//         ["use globally installed", "Use globally installed compiler/bundler/formatter", true]
//     );
//     return prompt<boolean>({
//         type: "select",
//         message: "Dev dependencies",
//         choices,
//         initial: choices.length - 1,
//     });
// }
