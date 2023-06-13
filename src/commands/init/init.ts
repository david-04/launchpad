import { CONFIG_PROPERTIES } from "../../config/config-properties.js";
import { loadConfigFile } from "../../config/old-config.js";
import type { Path } from "../../utilities/path.js";
import { getNewConfig } from "./config-wizard.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path) {
    const oldConfig = loadConfigFile(configFile, CONFIG_PROPERTIES)?.config;
    const newConfig = await getNewConfig(projectRoot, oldConfig);
    console.log(newConfig);
}
