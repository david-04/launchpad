import { parseCommandLineOptions } from "../../config/command-line-parser.js";
import { loadConfigFile } from "../../config/config-loader.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(_projectRoot: Path, configFile: Path, options: ReadonlyArray<string>) {
    const oldConfig = loadConfigFile(configFile);
    const commandLine = parseCommandLineOptions(options);

    return { oldConfig, commandLine };

    /*const newConfig = await getNewConfig(_projectRoot, oldConfig?.partial);*/
}
