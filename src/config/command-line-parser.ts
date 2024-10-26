import { fail } from "../utilities/fail";
import { assembleConfigFromCommandLineOptions } from "./config-objects";
import { ConfigProperties } from "./config-properties";

//----------------------------------------------------------------------------------------------------------------------
// Extract command line options
//----------------------------------------------------------------------------------------------------------------------

export function parseCommandLineOptions(parameters: ReadonlyArray<string>) {
    return assembleConfigFromCommandLineOptions(parameters.map(parameter => decomposeCommandLineParameter(parameter)));
}

//----------------------------------------------------------------------------------------------------------------------
// Split a command line option into a key-value pair
//----------------------------------------------------------------------------------------------------------------------

function decomposeCommandLineParameter(argument: string) {
    const index = Math.max(0, argument.indexOf("="));
    const key = argument.substring(0, index).trim();
    const value = argument.substring(index + 1).trim();
    if (!key) {
        return fail(`Invalid command line option "${argument}". Try launchpad --help for more information.`);
    } else if (!ConfigProperties.arrays.currentAndInitOnly.some(property => property.commandLineInfo?.option === key)) {
        return fail(`Invalid command line option "${key}". Try launchpad --help for more information.`);
    } else {
        return { key, value };
    }
}
