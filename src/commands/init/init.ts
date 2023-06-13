//----------------------------------------------------------------------------------------------------------------------
// https://github.com/terkelg/prompts
//----------------------------------------------------------------------------------------------------------------------

//import prompt, { type Choice, type PromptObject } from "prompts";
import prompts, { type Choice, type PromptObject } from "prompts";
import { CONFIG_PROPERTIES } from "../../config/config-properties.js";
import { Artifact, Runtime, SrcDir, TscOutDir, type NewConfig, VersionProperty } from "../../config/new-config.js";
import { loadConfigFile, type OldConfig } from "../../config/old-config.js";
import type { Path } from "../../utilities/path.js";
import { exit } from "process";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { Version } from "../../config/version.js";

//----------------------------------------------------------------------------------------------------------------------
// Data structures
//----------------------------------------------------------------------------------------------------------------------

const Template = {
    CLI: "cli",
    WEB: "web",
    PREACT: "preact",
} as const;

type Presets = Omit<{ [K in keyof NewConfig]: undefined | NewConfig[K] | "default" }, "projectName" | "version"> & {
    template: (typeof Template)[keyof typeof Template] | undefined;
};

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path) {
    const oldConfig = loadConfigFile(configFile, CONFIG_PROPERTIES)?.config;
    const newConfig = await getNewConfig(projectRoot, oldConfig);
    console.log(newConfig);
}

//----------------------------------------------------------------------------------------------------------------------
// Acquire the new configuration
//----------------------------------------------------------------------------------------------------------------------

async function getNewConfig(projectRoot: Path, oldConfig?: OldConfig) {
    const version = VersionProperty.of(Version.of(VERSION_NUMBER));
    const projectName = await getProjectName(projectRoot, oldConfig);
    const presets = await getPresets(oldConfig);

    return { version, projectName, presets };
}

//----------------------------------------------------------------------------------------------------------------------
// Prompt wrapper that exits if the returned value is "undefined"
//----------------------------------------------------------------------------------------------------------------------

async function prompt<T>(options: Omit<PromptObject<string>, "name">): Promise<T> {
    return ((await prompts({ ...options, name: "RESULT" })) ?? {})["RESULT"] ?? exit(1);
}

//----------------------------------------------------------------------------------------------------------------------
// Get the project name
//----------------------------------------------------------------------------------------------------------------------

async function getProjectName(projectRoot: Path, oldConfig?: OldConfig) {
    const message = 'The name must not be empty nor contain blanks or reserved characters like ":", "\\" or "/"';
    return prompt<string>({
        type: "text",
        initial: oldConfig?.projectName?.trim() || projectRoot.path.replace(/.*\//, "").trim(),
        message: "Project name",
        format: input => input.trim(),
        validate: value => !!value.match(/^[^:\\/<> \s]+$/) || message,
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Get template presets
//----------------------------------------------------------------------------------------------------------------------

async function getPresets(oldConfig?: OldConfig): Promise<Presets | undefined> {
    const SHARED_PRESETS: Omit<Presets, "template" | "runtime"> = {
        artifact: Artifact.unpinned("app"),
        module: "default",
        bundler: "default",
        bundlerDts: "default",
        formatter: "default",
        packageManager: "default",
        srcDir: SrcDir.of("src"),
        tscOutDir: TscOutDir.of("build"),
    };
    const choices: Array<Omit<Choice, "value"> & { value: Presets | undefined }> = [
        {
            title: "Node CLI script",
            description: "Node.js command line application",
            value: { ...SHARED_PRESETS, template: Template.CLI, runtime: Runtime.unpinned("node") },
        },
        {
            title: "Plain web app",
            description: "",
            value: { ...SHARED_PRESETS, template: Template.WEB, runtime: Runtime.unpinned("web") },
        },
        {
            title: "Preact web app",
            description: "",
            value: { ...SHARED_PRESETS, template: Template.PREACT, runtime: Runtime.unpinned("web") },
        },
        {
            title: "Custom",
            description: "Select all options manually",
            value: undefined,
        },
    ];
    const initial = oldConfig ? choices.length - 1 : 0;
    return prompt<Presets>({ type: "select", message: "Project type", choices, initial });
}
