import { exit } from "process";
import prompts, { type Choice, type PromptObject } from "prompts";
import {
    Artifact,
    Bundler,
    BundlerDts,
    Formatter,
    Module,
    PackageManager,
    Runtime,
    VersionProperty,
} from "../../config/new-config.js";
import type { OldConfig } from "../../config/old-config.js";
import { AllProjectTemplates, type TemplateConfig } from "../../config/template-config.js";
import { Version } from "../../config/version.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type EnumProperty = { readonly value: string; readonly pinned: boolean };

//----------------------------------------------------------------------------------------------------------------------
// Acquire the new configuration
//----------------------------------------------------------------------------------------------------------------------

export async function getNewConfig(projectRoot: Path, oldConfig: OldConfig | undefined) {
    const version = VersionProperty.of(Version.of(VERSION_NUMBER));
    const projectName = await getProjectName(projectRoot, oldConfig);
    const templateConfig = await getTemplateConfig(oldConfig);
    const artifact = templateConfig?.artifact ?? (await getArtifact(oldConfig));
    const runtime = templateConfig?.runtime ?? (await getRuntime(oldConfig, artifact));
    const module = templateConfig?.module ?? (await getModule(oldConfig));
    const bundler = templateConfig?.bundler ?? (await getBundler(oldConfig));
    const bundlerDts = templateConfig?.bundlerDts ?? (await getBundlerDts(oldConfig, bundler));
    const formatter = templateConfig?.formatter ?? (await getFormatter(oldConfig));
    const packageManager = templateConfig?.packageManager ?? (await getPackageManager(oldConfig));

    // LP_SETTINGS_SRC_DIR         = src                       # mandatory
    // LP_SETTINGS_TSC_OUT_DIR     = build                     # mandatory unless building a non-bundle app for ts-node

    return {
        version,
        projectName,
        templateConfig,
        artifact,
        runtime,
        module,
        bundler,
        bundlerDts,
        formatter,
        packageManager,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Select the project's name
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
// Select a project template
//----------------------------------------------------------------------------------------------------------------------

async function getTemplateConfig(oldConfig: OldConfig | undefined) {
    const toOption = (value: TemplateConfig) => ({ value, title: value.title, description: value.description });
    const choices = AllProjectTemplates.map(toOption);
    const initial = oldConfig ? choices.length - 1 : 0;
    return prompt<TemplateConfig>({ type: "select", message: "Project type", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the artifact type
//----------------------------------------------------------------------------------------------------------------------

async function getArtifact(oldConfig: OldConfig | undefined) {
    const choices = toChoice(
        ["Application", undefined, Artifact.unpinned("app")],
        ["Library", undefined, Artifact.unpinned("lib")]
    );
    const initial = oldConfig?.artifact?.value === "lib" ? 1 : 0;
    return prompt<Artifact>({ type: "select", message: "Artifact", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the runtime
//----------------------------------------------------------------------------------------------------------------------

async function getRuntime(oldConfig: OldConfig | undefined, artifact: Artifact) {
    const cliDescription = artifact.value === "app" ? "Command-line application" : "Library for command-line scripts";
    const webDescription = artifact.value === "app" ? "Web application" : "Browser library";
    const choices = toChoice(
        ["node", cliDescription, Runtime.unpinned("node")],
        ["web", webDescription, Runtime.unpinned("web")]
    );
    const initial = oldConfig?.runtime?.value === "web" ? 1 : 0;
    return prompt<Runtime>({ type: "select", message: "Runtime", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the module type
//----------------------------------------------------------------------------------------------------------------------

async function getModule(oldConfig: OldConfig | undefined) {
    const choices = toChoice(
        ["CommonJS", undefined, Module.unpinned("cjs")],
        ["ECMAScript modules", undefined, Module.unpinned("esm")]
    );
    const initial = oldConfig?.module?.value === "cjs" ? 0 : 1;
    return prompt<Module>({ type: "select", message: "Module type", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler
//----------------------------------------------------------------------------------------------------------------------

async function getBundler(oldConfig: OldConfig | undefined) {
    const choices = toChoice(
        ["default", "esbuild", Bundler.unpinned("esbuild")],
        ["esbuild", undefined, Bundler.pinned("esbuild")],
        ["disabled", "Don't use a bundler", Bundler.unpinned("disabled")]
    );
    const initial = findMatchingChoice(choices, oldConfig?.bundler, 0);
    return prompt<Bundler>({ type: "select", message: "Bundler", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the bundler for .d.ts declaration files
//----------------------------------------------------------------------------------------------------------------------

async function getBundlerDts(oldConfig: OldConfig | undefined, bundler: Bundler) {
    if (bundler.value === "disabled") {
        return BundlerDts.unpinned("disabled");
    }
    const choices = toChoice(
        ["default", "dts-bundle-generator", BundlerDts.unpinned("dts-bundle-generator")],
        ["dts-bundle-generator", undefined, BundlerDts.pinned("dts-bundle-generator")],
        ["disabled", "Don't bundle declaration files", BundlerDts.unpinned("disabled")]
    );
    const initial = findMatchingChoice(choices, oldConfig?.bundlerDts, 0);
    return prompt<BundlerDts>({ type: "select", message: "Declaration bundler", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the formatter
//----------------------------------------------------------------------------------------------------------------------

async function getFormatter(oldConfig: OldConfig | undefined) {
    const choices = toChoice(
        ["default", "Prettier", Formatter.unpinned("prettier")],
        ["Prettier", undefined, Formatter.pinned("prettier")],
        ["Rome", undefined, Formatter.pinned("rome")],
        ["disabled", "Don't use a formatter", Formatter.unpinned("disabled")]
    );
    const initial = findMatchingChoice(choices, oldConfig?.formatter, 0);
    return prompt<Formatter>({ type: "select", message: "Formatter", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Select the package manager
//----------------------------------------------------------------------------------------------------------------------

async function getPackageManager(oldConfig: OldConfig | undefined) {
    const choices = toChoice(
        ["default", "yarn", PackageManager.unpinned("yarn")],
        ["npm", undefined, PackageManager.pinned("npm")],
        ["pnpm", undefined, PackageManager.pinned("pnpm")],
        ["yarn", undefined, PackageManager.pinned("yarn")]
    );
    const initial = findMatchingChoice(choices, oldConfig?.packageManager, 0);
    return prompt<Formatter>({ type: "select", message: "Package manager", choices, initial });
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a drop-down value to an option
//----------------------------------------------------------------------------------------------------------------------

function toChoice<T>(...options: ReadonlyArray<[string, string | undefined, T, boolean?]>): Choice[] {
    return options.map(option => ({ title: option[0], description: option[1], value: option[2], selected: option[3] }));
}

//----------------------------------------------------------------------------------------------------------------------
// Get the index of the most suitable choice
//----------------------------------------------------------------------------------------------------------------------

function findMatchingChoice(
    choices: ReadonlyArray<{ value?: EnumProperty }>,
    oldConfig: EnumProperty | undefined,
    defaultIndex: number
) {
    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index]?.value;
        if (choice?.value === oldConfig?.value && true === choice?.pinned && true === oldConfig?.pinned) {
            return index;
        }
    }
    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index]?.value;
        if (choice?.value === oldConfig?.value) {
            return index;
        }
    }
    return defaultIndex;
}

//----------------------------------------------------------------------------------------------------------------------
// Prompt wrapper that exits if the returned value is "undefined"                     https://github.com/terkelg/prompts
//----------------------------------------------------------------------------------------------------------------------

async function prompt<T>(options: Omit<PromptObject<string>, "name">): Promise<T> {
    return ((await prompts({ ...options, name: "RESULT" })) ?? {})["RESULT"] ?? exit(1);
}
