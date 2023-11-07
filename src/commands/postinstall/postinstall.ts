import { loadConfigFile, type ParsedConfig } from "../../config/config-loader.js";
import type { NewConfig } from "../../config/config-objects.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { DISABLE_POSTINSTALL_ENV_VARIABLE_NAME, LAUNCHPAD_ERROR_FILE } from "../../utilities/constants.js";
import { ERROR_BANNER, FriendlyError } from "../../utilities/fail.js";
import { breakLines, createSeparator } from "../../utilities/logging.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function postinstall(projectRoot: Path, configFile: Path, _options: ReadonlyArray<string>) {
    if (process.env[DISABLE_POSTINSTALL_ENV_VARIABLE_NAME]?.trim()) {
        return;
    } else {
        try {
            const parsedConfig = loadConfigFile(configFile);
            const oldConfig = parsedConfig?.validated;
            if (oldConfig && 0 !== oldConfig.version.compareTo(VERSION_NUMBER)) {
                // TODO: Upgrade everything that can be done without an npm add/remove/install
                const newConfig = migrateConfig(oldConfig);
                console.log(newConfig);
            } else if (parsedConfig && !oldConfig) {
                exitWithConfigError(projectRoot, configFile, parsedConfig.errors);
            }
        } catch (error) {
            exitWithUnexpectedPostinstallError(projectRoot, error);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Migrate the old config to the new config
//----------------------------------------------------------------------------------------------------------------------

function migrateConfig(oldConfig: Exclude<ParsedConfig["validated"], undefined>): NewConfig {
    return {
        ...oldConfig,
        version: VERSION_NUMBER,
        dependencies: [],
        installDevDependencies: false,
        createProjectTemplate: false,
        createDebugModule: false,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Fail with a postinstall error
//----------------------------------------------------------------------------------------------------------------------

function exitWithConfigError(projectRoot: Path, configFile: Path, errors: ReadonlyArray<string> | undefined) {
    const lines = new Array<string>();
    if (errors) {
        lines.push(`The config file ${configFile.path} is invalid:`);
        lines.push("");
        errors.forEach(error => lines.push(`- ${error}`));
    } else {
        lines.push(`The config file ${configFile} is invalid (no further details are available).`);
    }
    exitWithPostinstallError(projectRoot, lines);
}

function exitWithUnexpectedPostinstallError(projectRoot: Path, error: unknown) {
    const lines = new Array<string>();
    if (error instanceof FriendlyError) {
        lines.push(error.message);
    } else if (error instanceof Error) {
        lines.push(error?.stack ?? `${error.name}: ${error.message}`);
    } else if (undefined !== error && `${error}`) {
        lines.push(`${error}`);
    } else {
        lines.push("Encountered an unexpected error (no further details are available).");
    }
    exitWithPostinstallError(projectRoot, lines);
}

//----------------------------------------------------------------------------------------------------------------------
// Save the error message and exit
//----------------------------------------------------------------------------------------------------------------------

function exitWithPostinstallError(projectRoot: Path, lines: ReadonlyArray<string>) {
    lines = renderPostinstallError(lines);
    [ERROR_BANNER, "", ...lines].forEach(text => console.error(text));
    const file = projectRoot.child(LAUNCHPAD_ERROR_FILE);
    try {
        const topPadding = file.existsAndIsFile() ? [""] : [];
        file.appendFileContents([...topPadding, ...createSeparator(new Date().toISOString()), ...lines, ""]);
    } catch (ignored) {}
}

//----------------------------------------------------------------------------------------------------------------------
// Format error lines
//----------------------------------------------------------------------------------------------------------------------

function renderPostinstallError(lines: ReadonlyArray<string>) {
    return breakLines([
        `Failed to migrate to launchpad version ${VERSION_NUMBER.render()}.`,
        "",
        ...lines,
        "",
        'Fix the underlying issue and run "launchpad uplift". To reset/reconfigure the project, run "launchpad init".',
    ]);
}
