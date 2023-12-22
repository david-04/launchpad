import { parseCommandLineOptions } from "../config/command-line-parser.js";
import { loadConfigFile } from "../config/config-loader.js";
import { migrate } from "../migration/migrate.js";
import { getNewConfig } from "../utilities/config-wizard.js";
import type { Path } from "../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path, options: ReadonlyArray<string>) {
    const parsedConfig = loadConfigFile(configFile);
    const commandLineConfig = parseCommandLineOptions(options);
    const newConfig = await getNewConfig(projectRoot, parsedConfig, commandLineConfig);
    console.log(parsedConfig ? "Re-initializing the project..." : "Initializing the project...");
    migrate({
        operation: "initialize",
        oldConfig: parsedConfig?.validated ?? parsedConfig?.partial,
        newConfig,
        projectRoot,
    });
}
