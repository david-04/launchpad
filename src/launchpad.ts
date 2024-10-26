import { init } from "./commands/init";
import { uplift } from "./commands/uplift";
import { ConfigProperties } from "./config/config-properties";
import { VERSION_NUMBER } from "./resources/version-information";
import { fail, formatError } from "./utilities/fail";
import { Path, getConfigFilePath } from "./utilities/path";

//----------------------------------------------------------------------------------------------------------------------
// Supported actions / command line arguments
//----------------------------------------------------------------------------------------------------------------------

const COMMANDS = [
    {
        name: "init",
        help: "init .......... initialize a new project or re-configure an existing one",
        getProjectRootDirectory: () => process.cwd(),
        execute: init,
    },
    {
        name: "uplift",
        help: "uplift ........ upgrade all dependencies (including launchpad) to the latest version ",
        getProjectRootDirectory: () => process.cwd(),
        execute: uplift,
    },
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Main CLI entry point
//----------------------------------------------------------------------------------------------------------------------

export async function launchpad(argv: ReadonlyArray<string>) {
    try {
        if (argv.some(arg => /^--?h(elp)?$/.exec(arg))) {
            return showHelp();
        } else if (argv.some(arg => /^--?(v|version)$/.exec(arg))) {
            return showVersion();
        } else {
            const [command, ...options] = argv.map(item => item.trim());
            return await findAndInvokeHandler(command, options);
        }
    } catch (error: unknown) {
        console.error("⛔ ERROR:", formatError(error));
        return process.exit(1);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Find and invoke the handler for the selected command
//----------------------------------------------------------------------------------------------------------------------

async function findAndInvokeHandler(argument: string | undefined, options: ReadonlyArray<string>) {
    const [command, ...rest] = COMMANDS.filter(command => command.name.toLowerCase() === argument?.toLowerCase());
    if (!argument) {
        return fail(`Missing command line argument. Try launchpad --help for more information.`);
    } else if (!command) {
        return fail(`Invalid command: ${argument}. Try launchpad --help for more information.`);
    } else if (rest.length) {
        return fail(`Found more than one handler for command ${argument}`);
    } else {
        const projectRoot = new Path(command.getProjectRootDirectory());
        const configFile = getConfigFilePath(projectRoot);
        return command.execute(projectRoot, configFile, options);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Show a help message
//----------------------------------------------------------------------------------------------------------------------

function showHelp() {
    const commands = COMMANDS.map(command => command.help)
        .filter(help => help.trim())
        .map(help => `  ${help}`);
    const options = getConfigProperties();
    const helpMessage = [
        "Usage: launchpad [COMMAND] [OPTIONS]",
        "",
        "[COMMAND]",
        "",
        ...commands.slice(0).sort((a, b) => a.localeCompare(b)),
        "",
        "[OPTIONS]",
        "",
        ...options.map(option => `  ${option}`).sort((a, b) => a.localeCompare(b)),
    ];
    helpMessage.forEach(line => console.log(line));
}

//----------------------------------------------------------------------------------------------------------------------
// Get the command line options for specifying configuration properties
//----------------------------------------------------------------------------------------------------------------------

function getConfigProperties() {
    const properties = ConfigProperties.arrays.currentAndInitOnly
        .map(property => property.commandLineInfo)
        .filter(<T>(property: T): property is Exclude<T, undefined> => !!property)
        .map(property => ({
            parameter: `${property.option}=${property.placeholder}`,
            description: property.description,
        }));
    const maxPropertyLength = properties.reduce((max, property) => Math.max(max, property.parameter.length), 0);
    return properties.map(property => `${property.parameter.padEnd(maxPropertyLength)}   ${property.description}`);
}

//----------------------------------------------------------------------------------------------------------------------
// Show the version number
//----------------------------------------------------------------------------------------------------------------------

function showVersion() {
    console.log(VERSION_NUMBER.render());
}
