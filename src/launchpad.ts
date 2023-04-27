import { VERSION_NUMBER } from "./resources/version-information.js";
import { fail } from "./utils/fail.js";

//----------------------------------------------------------------------------------------------------------------------
// Supported actions / command line arguments
//----------------------------------------------------------------------------------------------------------------------

const COMMANDS = [
    ["init ........ initialize a new project   ", init],
    ["uplift ...... uplift the current project ", uplift],
    ["test ........ run the unit tests         ", test],
] as const;

//----------------------------------------------------------------------------------------------------------------------
// The CLI main program
//----------------------------------------------------------------------------------------------------------------------

export async function launchpad(argv: ReadonlyArray<string>) {
    if (argv.some(arg => arg.match(/^--?h(elp)?$/))) {
        const commands = COMMANDS.map(array => `  ${array[0]}`);
        ["", "  Usage: launchpad [command]", "", ...commands].forEach(line => console.log(line));
        process.exit(0);
    } else if (argv.some(arg => arg.match(/^--?v(ersion)?$/))) {
        console.log(VERSION_NUMBER);
        process.exit(0);
    } else {
        const [command, ...options] = argv;
        const handler = getHandler(command?.trim());
        return await handler(options);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Find the most suitable handler
//----------------------------------------------------------------------------------------------------------------------

function getHandler(command: string | undefined): Function {
    if (undefined === command) {
        fail(`Missing command line arguments\nTry launchpad --help for more information`);
    } else if ("postinstall" === command) {
        return postinstall;
    } else {
        const matchingCommands = COMMANDS.filter(array => array[0].trim().replace(/\s.*/, "") === command);
        const [handler, ...rest] = matchingCommands.map(array => array[1]);
        if (rest.length) {
            throw new Error(`INTERNAL ERROR: Found more than one command handler for ${command}`);
        } else if (handler) {
            return handler;
        } else {
            fail(`Invalid command: ${command}\nTry launchpad --help for more information`);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

async function init(_options: ReadonlyArray<string>) {
    console.log("init");
    return true;
}

//----------------------------------------------------------------------------------------------------------------------
// Uplift an existing project
//----------------------------------------------------------------------------------------------------------------------

async function uplift(_options: ReadonlyArray<string>) {
    console.log("uplift");
    return true;
}

//----------------------------------------------------------------------------------------------------------------------
// Run unit tests
//----------------------------------------------------------------------------------------------------------------------

async function test(_options: ReadonlyArray<string>) {
    console.log("test");
    return true;
}

//----------------------------------------------------------------------------------------------------------------------
// Run post-install steps
//----------------------------------------------------------------------------------------------------------------------

async function postinstall(_options: ReadonlyArray<string>) {
    console.log("postinstall");
    return true;
}
