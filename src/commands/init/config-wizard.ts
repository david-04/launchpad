import { exit } from "process";
import type { Choice } from "prompts";
import { pinned, unpinned } from "../../config/config-data-types.js";
import type { ParsedConfig } from "../../config/config-loader.js";
import type { CommandLineConfig, NewConfig, OldPartialConfig } from "../../config/config-objects.js";
import { ConfigProperties } from "../../config/config-properties.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { DEFAULT_ENUM, N_A_ENUM, type DefaultEnum } from "../../utilities/constants.js";
import type { Path } from "../../utilities/path.js";
import {
    createDefaultOption,
    findNonPinnableMatchingChoice,
    findPinnableMatchingChoice,
    prompt,
    promptMultiSelect,
    promptYesNo,
    toChoice,
    toPinned,
    toValidator,
    type ChoiceOptions,
} from "../../utilities/prompt.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

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
    const presets = { oldConfig: await getOldConfig(parsedConfig), commandLineConfig };
    const version = VERSION_NUMBER;
    const projectName = await getProjectName(presets, projectRoot);
    const artifact = await getArtifact(presets);
    const runtime = await getRuntime(presets);
    const module = await getModule(presets);
    const installationMode = await getInstallationMode(presets);
    const bundler = await getBundler(presets);
    const dtsBundler = await getDtsBundler(presets, bundler);
    const formatter = await getFormatter(presets);
    const tabSize = await getTabSize(presets);
    const packageManager = await getPackageManager(presets, { installationMode });
    const srcDir = await getSrcDir(presets);
    const webAppDir = await getWebAppDir(presets, { runtime, artifact });
    const tscOutDir = await getTscOutDir(presets, { projectName, runtime, bundler, dtsBundler, webAppDir });
    const bundlerOutDir = await getBundlerOutDir(presets, { runtime, bundler, webAppDir });
    const dependencies = await getDependencies(presets, { runtime });
    const installDevDependencies = await getInstallDevDependencies(presets);
    const createProjectTemplate = await getCreateProjectTemplate(presets);
    const createDebugModule = await getCreateDebugModule(presets);
    return {
        version,
        projectName,
        artifact,
        runtime,
        module,
        installationMode,
        bundler,
        dtsBundler,
        formatter,
        tabSize,
        packageManager,
        srcDir,
        webAppDir,
        tscOutDir,
        bundlerOutDir,
        dependencies,
        installDevDependencies,
        createProjectTemplate,
        createDebugModule,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Extract the old configuration and confirm any errors that might have occurred
//----------------------------------------------------------------------------------------------------------------------

async function getOldConfig(parsedConfig: ParsedConfig | undefined) {
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
    const defaultName = projectRoot.path.replace(/.*\//, "").trim();
    const preselectedName = presets.commandLineConfig.projectName;
    if (undefined !== preselectedName) {
        return DEFAULT_ENUM === preselectedName ? defaultName : preselectedName;
    }
    return prompt<string>({
        type: "text",
        initial: presets.oldConfig?.projectName?.trim() || defaultName,
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

async function getRuntime(presets: Presets): Promise<NewConfig["runtime"]> {
    const FIELD = "runtimeCli";
    type T = CommandLineConfig[typeof FIELD];
    const preselectedValue: T = "cli";
    const presetValue = DEFAULT_ENUM === presets.commandLineConfig[FIELD] ? "cli" : presets.commandLineConfig[FIELD];
    const oldValue = runtimeConfigToCli(presets.oldConfig?.["runtime"]);
    if (presetValue) {
        return runtimeCliToConfig(presetValue);
    } else {
        const options = ConfigProperties[FIELD].options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, preselectedValue);
        return runtimeCliToConfig(
            await prompt<Exclude<T, "default" | undefined>>({ type: "select", message: "Bundler", choices, initial })
        );
    }
}

function runtimeConfigToCli(property: NewConfig["runtime"] | undefined): CommandLineConfig["runtimeCli"] {
    if (undefined === property) {
        return undefined;
    } else {
        return "node" === property.value && !property.pinned ? "cli" : property.value;
    }
}

function runtimeCliToConfig(value: Exclude<CommandLineConfig["runtimeCli"], undefined>): NewConfig["runtime"] {
    if ("cli" === value || DEFAULT_ENUM === value) {
        return unpinned("node");
    } else {
        return pinned(value);
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
// Select the launchpad installation mode
//----------------------------------------------------------------------------------------------------------------------

async function getInstallationMode(presets: Presets) {
    const FIELD = "installationMode";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = "local";
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        const options = ConfigProperties[FIELD].options.map(array => [...array, array[0]] as const);
        const choices = toChoice(options);
        const initial = findNonPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Launchpad installation mode", choices, initial });
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
    if ("disabled" === bundler.value) {
        return pinned("disabled");
    }
    const FIELD = "dtsBundler";
    type T = NewConfig[typeof FIELD];
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
// Select the formatter
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
// Select the tab size
//----------------------------------------------------------------------------------------------------------------------

async function getTabSize(presets: Presets) {
    const FIELD = "tabSize";
    type T = NewConfig[typeof FIELD];
    const defaultValue: T = 4;
    const presetValue: T | typeof DEFAULT_ENUM | undefined = presets.commandLineConfig[FIELD];
    const oldValue = presets.oldConfig?.[FIELD];
    if (presetValue) {
        return DEFAULT_ENUM === presetValue ? defaultValue : presetValue;
    } else {
        return prompt<number>({
            type: "number",
            initial: oldValue ?? defaultValue,
            message: "Tab size",
            validate: toValidator((value, source) => {
                if ("" === value) {
                    return "";
                } else {
                    const result = ConfigProperties[FIELD].parseNewValue(value, source);
                    return "number" === typeof result ? `${result}` : result;
                }
            }),
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the package manager
//----------------------------------------------------------------------------------------------------------------------

async function getPackageManager(presets: Presets, config: Pick<NewConfig, "installationMode">) {
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
            ...ConfigProperties[FIELD].options
                .filter(option => config.installationMode !== "global-auto-update" || option[0] === "yarn")
                .map(array => [...array, pinned(array[0])] as const),
        ];
        const choices = toChoice(options);
        const initial = findPinnableMatchingChoice(options, oldValue, defaultValue);
        return prompt<T>({ type: "select", message: "Package manager", choices, initial });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the source directory
//----------------------------------------------------------------------------------------------------------------------

async function getSrcDir(presets: Presets) {
    const FIELD = "srcDir";
    const defaultDirectory = "src";
    const preselectedDirectory = presets.commandLineConfig[FIELD];
    if (preselectedDirectory) {
        return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
    } else {
        return prompt<string>({
            type: "text",
            initial: presets.oldConfig?.[FIELD] ?? defaultDirectory,
            message: "Source directory",
            format: input => input.trim(),
            validate: toValidator(ConfigProperties[FIELD].parseNewValue),
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the web app root directory
//----------------------------------------------------------------------------------------------------------------------

async function getWebAppDir(presets: Presets, config: Pick<NewConfig, "runtime" | "artifact">) {
    if ("web" !== config.runtime.value || "app" !== config.artifact) {
        return N_A_ENUM;
    }
    const FIELD = "webAppDir";
    const defaultDirectory = "dist";
    const preselectedDirectory = presets.commandLineConfig[FIELD];
    if (preselectedDirectory) {
        return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
    } else {
        const previousValue = presets.oldConfig?.[FIELD];
        return prompt<string>({
            type: "text",
            initial: undefined !== previousValue && N_A_ENUM !== previousValue ? previousValue : defaultDirectory,
            message: "Web app root directory",
            format: input => input.trim(),
            validate: toValidator(ConfigProperties[FIELD].parseNewValue),
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the TSC compiler's output directory
//----------------------------------------------------------------------------------------------------------------------

async function getTscOutDir(presets: Presets, config: Parameters<typeof getDefaultTscOutDir>[0]) {
    const FIELD = "tscOutDir";
    const defaultDirectory = getDefaultTscOutDir(config);
    const preselectedDirectory = presets.commandLineConfig[FIELD];
    if (preselectedDirectory) {
        return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
    } else {
        return prompt<string>({
            type: "text",
            initial: presets.oldConfig?.[FIELD] ?? defaultDirectory,
            message: "TSC output directory",
            format: input => input.trim(),
            validate: toValidator(ConfigProperties[FIELD].parseNewValue),
        });
    }
}

function getDefaultTscOutDir(
    config: Pick<NewConfig, "projectName" | "runtime" | "bundler" | "dtsBundler" | "webAppDir">
) {
    if ("web" === config.runtime.value) {
        return "disabled" === config.bundler.value ? `${config.webAppDir}/js/${config.projectName}` : "build";
    } else {
        return "disabled" === config.bundler.value ? "dist" : "build";
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler output directory
//----------------------------------------------------------------------------------------------------------------------

async function getBundlerOutDir(presets: Presets, config: Pick<NewConfig, "runtime" | "bundler" | "webAppDir">) {
    if ("disabled" === config.bundler.value) {
        return N_A_ENUM;
    }
    const FIELD = "bundlerOutDir";
    const defaultDirectory = "web" === config.runtime.value ? `${config.webAppDir}/js` : "dist";
    const preselectedDirectory = presets.commandLineConfig[FIELD];
    if (preselectedDirectory) {
        return DEFAULT_ENUM === preselectedDirectory ? defaultDirectory : preselectedDirectory;
    } else {
        const previousValue = presets.oldConfig?.[FIELD];
        return prompt<string>({
            type: "text",
            initial: undefined !== previousValue && N_A_ENUM !== previousValue ? previousValue : defaultDirectory,
            message: "Bundler output directory",
            format: input => input.trim(),
            validate: toValidator(ConfigProperties[FIELD].parseNewValue),
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get the dependencies to install
//----------------------------------------------------------------------------------------------------------------------

async function getDependencies(presets: Presets, config: Pick<NewConfig, "runtime">) {
    const options = getDependencyOptions(presets, config);
    if (0 == options.interactive.length) {
        return options.autoSelected;
    } else {
        const selection = await promptMultiSelect({
            type: "multiselect",
            choices: options.interactive,
            message: "Install packages",
        });
        return [...options.autoSelected, ...selection].sort();
    }
}

function getDependencyOptions(presets: Presets, config: Pick<NewConfig, "runtime">) {
    const defaultOptionalDependencies = "web" === config.runtime.value ? [] : ["@types/node"];
    return toDependencyOptions({
        mandatory: toSet(presets.commandLineConfig.dependencies, []),
        preselected: toSet(presets.commandLineConfig.preselectedDependencies, []),
        optional: toSet(presets.commandLineConfig.optionalDependencies, defaultOptionalDependencies),
    });
}

function toSet(
    value: ReadonlyArray<string> | DefaultEnum | undefined,
    defaultValues: ReadonlyArray<string>
): ReadonlySet<string> {
    return value instanceof Array ? new Set(value) : new Set(defaultValues);
}

function toDependencyOptions(dependencies: Record<"mandatory" | "preselected" | "optional", ReadonlySet<string>>) {
    const preselected = new Set<string>(dependencies.preselected);
    const optional = new Set<string>(dependencies.optional);
    dependencies.mandatory.forEach(dependency => [preselected, optional].forEach(set => set.delete(dependency)));
    preselected.forEach(dependency => optional.delete(dependency));
    return {
        autoSelected: [...dependencies.mandatory],
        interactive: [
            ...Array.from(preselected).map(value => ({ value, title: value, selected: true } as const)),
            ...Array.from(optional).map(value => ({ value, title: value, selected: false } as const)),
        ].sort((a, b) => a.value.localeCompare(b.value)) as Choice[],
    } as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Install dev dependencies locally
//----------------------------------------------------------------------------------------------------------------------

async function getInstallDevDependencies(presets: Presets) {
    const FIELD = "installDevDependencies";
    const preselectedOption = presets.commandLineConfig[FIELD];
    if (undefined !== preselectedOption) {
        return DEFAULT_ENUM === preselectedOption ? true : preselectedOption;
    } else {
        return promptYesNo({
            message: "Install dev dependencies (compiler, bundler, formatter, ...)",
            yesHint: "Install locally",
            noHint: "Rely on globally installed versions",
            default: true,
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a project template
//----------------------------------------------------------------------------------------------------------------------

async function getCreateProjectTemplate(presets: Presets) {
    const FIELD = "createProjectTemplate";
    const preselectedOption = presets.commandLineConfig[FIELD];
    if (undefined !== preselectedOption) {
        return DEFAULT_ENUM === preselectedOption ? !presets.oldConfig : preselectedOption;
    } else if (!presets.oldConfig) {
        return true;
    } else {
        return promptYesNo({
            message: "Create project template",
            yesHint: "Scaffold a minimal project",
            noHint: "Don't create any source files",
            default: false,
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a debug module
//----------------------------------------------------------------------------------------------------------------------

async function getCreateDebugModule(presets: Presets) {
    const FIELD = "createDebugModule";
    const preselectedOption = presets.commandLineConfig[FIELD];
    if (undefined !== preselectedOption) {
        return DEFAULT_ENUM === preselectedOption ? false : preselectedOption;
    } else {
        return false;
    }
}
