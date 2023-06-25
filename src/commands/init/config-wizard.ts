import { exit } from "process";
import prompts, { type Choice, type PromptObject } from "prompts";
import { pinned, unpinned, type ConfigError, type PinnableEnumValue } from "../../config/config-data-types.js";
import type { ParsedConfig } from "../../config/config-loader.js";
import type { CommandLineConfig, NewConfig, OldPartialConfig } from "../../config/config-objects.js";
import { ConfigProperties } from "../../config/config-properties.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { DEFAULT_ENUM, defaultMightChange } from "../../utilities/constants.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

// type EnumProperty = { readonly value: string; readonly pinned: boolean };

type Presets = {
    oldConfig: OldPartialConfig | undefined;
    commandLineConfig: CommandLineConfig;
};

type ChoiceOption<T> = readonly [string, string | undefined, T, boolean?];
type ChoiceOptions<T> = ReadonlyArray<ChoiceOption<T>>;

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
    // const formatter = await getFormatter(oldConfig);
    // const packageManager = await getPackageManager(oldConfig);
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
        // formatter,
        // packageManager,
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
    type T = NewConfig["artifact"];
    const defaultValue: T = "app";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig.artifact;
    const oldValue = presets.oldConfig?.artifact;
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties.artifact.options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Artifact", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the runtime
//----------------------------------------------------------------------------------------------------------------------

async function getRuntime(presets: Presets) {
    type T = NewConfig["runtime"];
    const defaultValue: T = "cli";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig.runtime;
    const oldValue = presets.oldConfig?.runtime;
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties.runtime.options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Runtime", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the module system
//----------------------------------------------------------------------------------------------------------------------

async function getModule(presets: Presets) {
    type T = NewConfig["module"];
    const defaultValue: T = "esm";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig.module;
    const oldValue = presets.oldConfig?.module;
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties.module.options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Module system", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler
//----------------------------------------------------------------------------------------------------------------------

async function getBundler(presets: Presets) {
    type T = NewConfig["bundler"];
    const defaultValue: T = unpinned("esbuild");
    const preselectedValue: T = pinned("disabled");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig.bundler;
    const oldValue = presets.oldConfig?.bundler;
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties.bundler.options.map(array => [...array, pinned(array[0])] as const),
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
    type T = NewConfig["dtsBundler"];
    if ("disabled" === bundler.value) {
        return pinned("disabled");
    }
    const defaultValue: T = unpinned("dts-bundle-generator");
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig.dtsBundler;
    const oldValue = presets.oldConfig?.dtsBundler;
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : toPinned(presetValue);
    } else {
        const options: ChoiceOptions<T> = [
            createDefaultOption(defaultValue.value),
            ...ConfigProperties.dtsBundler.options.map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "DTS bundler", choices, initial });
    }
}

// //----------------------------------------------------------------------------------------------------------------------
// // Select the bundler
// //----------------------------------------------------------------------------------------------------------------------

// async function getBundler(oldConfig: OldConfig | undefined) {
//     const choices = toChoice(
//         ["default", "esbuild", Bundler.unpinned("esbuild")],
//         ["esbuild", undefined, Bundler.pinned("esbuild")],
//         ["disabled", "Don't use a bundler", Bundler.unpinned("disabled")]
//     );
//     const initial = findMatchingChoice(choices, oldConfig?.bundler, 0);
//     return prompt<Bundler>({ type: "select", message: "Bundler", choices, initial });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Select the bundler for .d.ts declaration files
// //----------------------------------------------------------------------------------------------------------------------

// async function getBundlerDts(oldConfig: OldConfig | undefined, bundler: Bundler) {
//     if (bundler.value === "disabled") {
//         return BundlerDts.unpinned("disabled");
//     }
//     const choices = toChoice(
//         ["default", "dts-bundle-generator", BundlerDts.unpinned("dts-bundle-generator")],
//         ["dts-bundle-generator", undefined, BundlerDts.pinned("dts-bundle-generator")],
//         ["disabled", "Don't bundle declaration files", BundlerDts.unpinned("disabled")]
//     );
//     const initial = findMatchingChoice(choices, oldConfig?.bundlerDts, 0);
//     return prompt<BundlerDts>({ type: "select", message: "Declaration bundler", choices, initial });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Select the formatter
// //----------------------------------------------------------------------------------------------------------------------

// async function getFormatter(oldConfig: OldConfig | undefined) {
//     const choices = toChoice(
//         ["default", "Prettier", Formatter.unpinned("prettier")],
//         ["Prettier", undefined, Formatter.pinned("prettier")],
//         ["Rome", undefined, Formatter.pinned("rome")],
//         ["disabled", "Don't use a formatter", Formatter.unpinned("disabled")]
//     );
//     const initial = findMatchingChoice(choices, oldConfig?.formatter, 0);
//     return prompt<Formatter>({ type: "select", message: "Formatter", choices, initial });
// }

// //----------------------------------------------------------------------------------------------------------------------
// // Select the package manager
// //----------------------------------------------------------------------------------------------------------------------

// async function getPackageManager(oldConfig: OldConfig | undefined) {
//     const choices = toChoice(
//         ["default", "yarn", PackageManager.unpinned("yarn")],
//         ["npm", undefined, PackageManager.pinned("npm")],
//         ["pnpm", undefined, PackageManager.pinned("pnpm")],
//         ["yarn", undefined, PackageManager.pinned("yarn")]
//     );
//     const initial = findMatchingChoice(choices, oldConfig?.packageManager, 0);
//     return prompt<Formatter>({ type: "select", message: "Package manager", choices, initial });
// }

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

// //----------------------------------------------------------------------------------------------------------------------
// // Get the index of the most suitable choice
// //----------------------------------------------------------------------------------------------------------------------

// function findMatchingChoice(
//     choices: ReadonlyArray<{ value?: EnumProperty }>,
//     oldConfig: EnumProperty | undefined,
//     defaultIndex: number
// ) {
//     for (let index = 0; index < choices.length; index++) {
//         const choice = choices[index]?.value;
//         if (choice?.value === oldConfig?.value && true === choice?.pinned && true === oldConfig?.pinned) {
//             return index;
//         }
//     }
//     for (let index = 0; index < choices.length; index++) {
//         const choice = choices[index]?.value;
//         if (choice?.value === oldConfig?.value) {
//             return index;
//         }
//     }
//     return defaultIndex;
// }

//----------------------------------------------------------------------------------------------------------------------
// Convert
//----------------------------------------------------------------------------------------------------------------------

function toPinned<T>(value: PinnableEnumValue<T>) {
    return { value: value.value, pinned: true };
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a parser function into a validator
//----------------------------------------------------------------------------------------------------------------------

function toValidator(parseNewValue: (value: string, source: string | undefined) => string | ConfigError) {
    return (value: string) => {
        const result = parseNewValue(value, undefined);
        return result && "object" === typeof result && "error" in result ? result.error : true;
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a "default" option that currently resolves to the given value
//----------------------------------------------------------------------------------------------------------------------

function createDefaultOption<T extends string>(value: T) {
    return ["default", defaultMightChange(value), unpinned(value)] as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Prompt wrapper that exits if the returned value is "undefined"                     https://github.com/terkelg/prompts
//----------------------------------------------------------------------------------------------------------------------

async function prompt<T>(options: Omit<PromptObject<string>, "name">): Promise<T> {
    return ((await prompts({ ...options, name: "RESULT" })) ?? {})["RESULT"] ?? exit(1);
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a drop-down value to an option
//----------------------------------------------------------------------------------------------------------------------

function toChoice<T>(options: ChoiceOptions<T>): Choice[] {
    return options.map(option => ({ title: option[0], description: option[1], value: option[2], selected: option[3] }));
}

//----------------------------------------------------------------------------------------------------------------------
// Find the best initial choice for a non-pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function findNonPinnableMatchingChoice<T extends string>(
    choices: ChoiceOptions<T>,
    ...selectedValues: ReadonlyArray<T | undefined>
) {
    for (const selectedValue of selectedValues) {
        const index = choices.findIndex(choice => choice[0] === selectedValue);
        if (0 <= index) {
            return index;
        }
    }
    return 0;
}

//----------------------------------------------------------------------------------------------------------------------
// Find the best initial choice for a pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function findPinnableMatchingChoice<T extends string>(
    choices: ChoiceOptions<PinnableEnumValue<T>>,
    ...selectedValues: ReadonlyArray<PinnableEnumValue<T> | undefined>
) {
    console.log(choices);
    console.log(selectedValues);
    for (const selectedValue of selectedValues) {
        if (selectedValue) {
            const index1 = choices.findIndex(
                choice => choice[2].pinned === selectedValue.pinned && choice[2].value === selectedValue.value
            );
            if (0 <= index1) {
                return index1;
            }
            const index2 = choices.findIndex(choice => choice[2].value === selectedValue.value);
            if (0 <= index2) {
                return index2;
            }
        }
    }
    return 0;
}
