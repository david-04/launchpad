//----------------------------------------------------------------------------------------------------------------------
// https://github.com/terkelg/prompts
//----------------------------------------------------------------------------------------------------------------------

//import prompt, { type Choice, type PromptObject } from "prompts";
import { exit } from "process";
import prompts, { type PromptObject } from "prompts";
import { CONFIG_PROPERTIES } from "../../config/config-properties.js";
import { VersionProperty } from "../../config/new-config.js";
import { loadConfigFile, type OldConfig } from "../../config/old-config.js";
import { AllProjectTemplates, type TemplateConfig } from "../../config/template-config.js";
import { Version } from "../../config/version.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import type { Path } from "../../utilities/path.js";

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

async function getPresets(oldConfig?: OldConfig): Promise<TemplateConfig | undefined> {
    const toOption = (value: TemplateConfig) => ({ value, title: value.title, description: value.description });
    const choices = AllProjectTemplates.map(toOption);
    const initial = oldConfig ? choices.length - 1 : 0;
    return prompt<TemplateConfig>({ type: "select", message: "Project type", choices, initial });
}
