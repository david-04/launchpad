import { parseCommandLineOptions } from "../config/command-line-parser";
import { loadConfigFile } from "../config/config-loader";
import { migrate } from "../migration/migrate";
import { getNewConfig } from "../utilities/config-wizard";
import type { Path } from "../utilities/path";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path, options: ReadonlyArray<string>) {
    const parsedConfig = loadConfigFile(configFile);
    const commandLineConfig = parseCommandLineOptions(options);
    const newConfig = await getNewConfig(projectRoot, parsedConfig, commandLineConfig);
    const { projectName } = newConfig;
    console.log(parsedConfig ? `Re-initializing project ${projectName}...` : `Initializing project ${projectName}...`);
    migrate({
        operation: "init",
        oldConfig: parsedConfig?.validated ?? parsedConfig?.partial,
        newConfig,
        projectRoot,
    });
    console.log("");
    console.log(`✅ Successfully initialized project ${newConfig.projectName}`);
}
