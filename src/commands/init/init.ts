import { parseCommandLineOptions } from "../../config/command-line-parser.js";
import { loadConfigFile } from "../../config/config-loader.js";
import { migrate } from "../../migration/migrate.js";
import type { Path } from "../../utilities/path.js";
import { getNewConfig } from "./config-wizard.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path, options: ReadonlyArray<string>) {
    const parsedConfig = loadConfigFile(configFile);
    const commandLineConfig = parseCommandLineOptions(options);
    const newConfig = await getNewConfig(projectRoot, parsedConfig, commandLineConfig);
    migrate({
        canPromptUser: true,
        canRunPackageManagerCommands: true,
        oldConfig: parsedConfig,
        newConfig,
        projectRoot,
    });
}
