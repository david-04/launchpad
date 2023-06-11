import { init } from "./commands/init/init.js";
import { VERSION_NUMBER } from "./resources/version-information.js";
import { fail, formatError } from "./utilities/fail.js";
import { Path, getConfigFilePath } from "./utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Supported actions / command line arguments
//----------------------------------------------------------------------------------------------------------------------

const COMMANDS = [
    ["init ........ initialize a new project   ", init],
    ["uplift ...... uplift the current project ", uplift],
    ["test ........ run the unit tests         ", test],
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Main CLI entry point
//----------------------------------------------------------------------------------------------------------------------

export async function launchpad(argv: ReadonlyArray<string>) {
    try {
        if (argv.some((arg) => arg.match(/^--?h(elp)?$/))) {
            showHelp();
        } else if (argv.some((arg) => arg.match(/^--?v(ersion)?$/))) {
            showVersion();
        } else {
            return await analyzeArgumentsAndExecuteCommand(argv);
        }
    } catch (error: unknown) {
        console.error(formatError(error));
        process.exit(1);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Postinstall entry point
//----------------------------------------------------------------------------------------------------------------------

export async function postinstall() {
    const { projectRoot, configFile } = createPaths(process.env["INIT_CWD"]);
    if (configFile.existsAndIsFile()) {
        return await uplift([], projectRoot, configFile, true);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Locate the project root directory and the configuration file within
//----------------------------------------------------------------------------------------------------------------------

function createPaths(preferredRootDirectory?: string) {
    const projectRoot = new Path(preferredRootDirectory ?? process.cwd());
    const configFile = getConfigFilePath(projectRoot);
    return { projectRoot, configFile };
}

//----------------------------------------------------------------------------------------------------------------------
// Analyze the command line arguments and perform the requested operation
//----------------------------------------------------------------------------------------------------------------------

async function analyzeArgumentsAndExecuteCommand(argv: ReadonlyArray<string>) {
    const [command, ...options] = argv;
    if (undefined === command) {
        fail(`Missing command line arguments\nTry launchpad --help for more information`);
    } else {
        const handler = getHandler(command.trim());
        const { projectRoot, configFile } = createPaths();
        return await handler(options, projectRoot, configFile, false);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Show a help message
//----------------------------------------------------------------------------------------------------------------------

function showHelp() {
    const commands = COMMANDS.map((array) => `  ${array[0]}`);
    ["", "  Usage: launchpad [command]", "", ...commands].forEach((line) => console.log(line));
}

//----------------------------------------------------------------------------------------------------------------------
// Show the version number
//----------------------------------------------------------------------------------------------------------------------

function showVersion() {
    console.log(VERSION_NUMBER);
}

//----------------------------------------------------------------------------------------------------------------------
// Find the most suitable handler
//----------------------------------------------------------------------------------------------------------------------

function getHandler(command: string) {
    const matchingCommands = COMMANDS.filter((array) => array[0].trim().replace(/\s.*/, "") === command);
    const [handler, ...rest] = matchingCommands.map((array) => array[1]);
    if (rest.length) {
        throw new Error(`INTERNAL ERROR: Found more than one command handler for ${command}`);
    } else {
        return handler ? handler : fail(`Invalid command: ${command}\nTry launchpad --help for more information`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Uplift an existing project
//----------------------------------------------------------------------------------------------------------------------

async function uplift(options: ReadonlyArray<string>, _projectRoot: Path, _configFile: Path, _isPostinstall: boolean) {
    assertNoCommandLineOptions("uplift", options);
    fail("The 'uplift' command is not implemented yet");
}

//----------------------------------------------------------------------------------------------------------------------
// Run unit tests
//----------------------------------------------------------------------------------------------------------------------

async function test(_options: ReadonlyArray<string>, _projectRoot: Path, _configFile: Path, _isPostinstall: boolean) {
    fail("The 'test' command is not implemented yet");
}

//----------------------------------------------------------------------------------------------------------------------
// Assert that no command line options array is empty
//----------------------------------------------------------------------------------------------------------------------

function assertNoCommandLineOptions(command: string, options: ReadonlyArray<string>) {
    if (options.length) {
        fail(`The ${command} command does not support parameter options`);
    }
}
