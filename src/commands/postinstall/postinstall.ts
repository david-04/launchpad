import { loadConfigFile, type ParsedConfig } from "../../config/config-loader.js";
import type { NewConfig } from "../../config/config-objects.js";
import { VERSION_NUMBER } from "../../resources/version-information.js";
import { LAUNCHPAD_ERROR_FILE } from "../../utilities/constants.js";
import { ERROR_BANNER, FriendlyError } from "../../utilities/fail.js";
import type { Path } from "../../utilities/path.js";

const SEPARATOR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 11, 12].map(() => "----------").join("");
const MAX_LINE_LENGTH = SEPARATOR.length;

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function postinstall(projectRoot: Path, configFile: Path, _options: ReadonlyArray<string>) {
    try {
        const parsedConfig = loadConfigFile(configFile);
        const oldConfig = parsedConfig?.validated;
        if (oldConfig && 0 !== oldConfig.version.compareTo(VERSION_NUMBER)) {
            const newConfig = migrateConfig(oldConfig);
            console.log(newConfig);
        } else if (parsedConfig && !oldConfig) {
            exitWithConfigError(projectRoot, configFile, parsedConfig.errors);
        }
    } catch (error) {
        exitWithUnexpectedPostinstallError(projectRoot, error);
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
        const contents = [SEPARATOR, new Date().toISOString(), SEPARATOR, "", ...lines, ""];
        file.appendFileContents(file.existsAndIsFile() ? ["", ...contents] : contents);
    } catch (ignored) {}
}

//----------------------------------------------------------------------------------------------------------------------
// Format error lines
//----------------------------------------------------------------------------------------------------------------------

function renderPostinstallError(lines: ReadonlyArray<string>) {
    return [
        `Failed to migrate to launchpad version ${VERSION_NUMBER.render()}.`,
        "",
        ...lines,
        "",
        'Fix the underlying issue and run "launchpad postinstall" to retry.' +
            ' If the problem persists, try to run "launchpad uplift".' +
            ' To reset/reconfigure, run "launchpad init".',
    ].flatMap(breakLine);
}

function breakLine(line: string) {
    line = line.trim();
    const isListItem = line.startsWith("- ");
    const lines = new Array<string>();
    while (MAX_LINE_LENGTH < line.length) {
        let index = line.substring(0, MAX_LINE_LENGTH).lastIndexOf(" ");
        index = 0 < index ? index : MAX_LINE_LENGTH;
        lines.push(line.substring(0, index));
        line = line.substring(index + 1).trim();
        line = (isListItem && line ? "  " : "") + line;
    }
    if (line || !lines.length) {
        lines.push(line);
    }
    return lines;
}
