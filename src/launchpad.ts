import { init } from "./commands/init/init.js";
import { postinstall } from "./commands/postinstall/postinstall.js";
import { uplift } from "./commands/uplift/uplift.js";
import { VERSION_NUMBER } from "./resources/version-information.js";
import { fail, formatError } from "./utilities/fail.js";
import { Path, getConfigFilePath } from "./utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Supported actions / command line arguments
//----------------------------------------------------------------------------------------------------------------------

const COMMANDS = [
    {
        name: "init",
        help: "init .......... initialize a new project",
        getProjectRootDirectory: () => process.cwd(),
        execute: init,
    },
    {
        name: "postinstall",
        help: "",
        getProjectRootDirectory: () => process.env["INIT_CWD"] ?? process.cwd(),
        execute: postinstall,
    },
    {
        name: "uplift",
        help: "uplift ........ uplift the current project",
        getProjectRootDirectory: () => process.cwd(),
        execute: uplift,
    },
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Main CLI entry point
//----------------------------------------------------------------------------------------------------------------------

export async function launchpad(argv: ReadonlyArray<string>) {
    try {
        if (argv.some(arg => arg.match(/^--?h(elp)?$/))) {
            return showHelp();
        } else if (argv.some(arg => arg.match(/^--?v(ersion)?$/))) {
            return showVersion();
        } else {
            const [command, ...options] = argv.map(item => item.trim());
            return await findAndInvokeHandler(command, options);
        }
    } catch (error: unknown) {
        console.error(formatError(error));
        process.exit(1);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Find and invoke the handler for the selected command
//----------------------------------------------------------------------------------------------------------------------

async function findAndInvokeHandler(argument: string | undefined, options: ReadonlyArray<string>) {
    const [command, ...rest] = COMMANDS.filter(command => command.name.toLowerCase() === argument?.toLowerCase());
    if (!argument) {
        fail(`Missing command line argument.\nTry launchpad --help for more information`);
    } else if (!command) {
        fail(`Invalid command: ${argument}\nTry launchpad --help for more information`);
    } else if (rest.length) {
        fail(`Found more than one handler for command ${argument}`);
    } else if (options.length) {
        fail(`Command ${argument} does not support command line options`);
    } else {
        command;
        const projectRoot = new Path(command.getProjectRootDirectory());
        const configFile = getConfigFilePath(projectRoot);
        return command.execute(projectRoot, configFile);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Show a help message
//----------------------------------------------------------------------------------------------------------------------

function showHelp() {
    const commands = COMMANDS.map(command => command.help)
        .filter(help => help.trim())
        .map(help => `  ${help}`);
    ["", "  Usage: launchpad [command]", "", ...commands].forEach(line => console.log(line));
}

//----------------------------------------------------------------------------------------------------------------------
// Show the version number
//----------------------------------------------------------------------------------------------------------------------

function showVersion() {
    console.log(VERSION_NUMBER);
}
