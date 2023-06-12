import { CONFIG_PROPERTIES } from "../../config/config-properties.js";
import { loadConfigFile } from "../../config/old-config.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(_projectRoot: Path, _configFile: Path) {
    const config = loadConfigFile(_configFile, CONFIG_PROPERTIES);
    console.log(JSON.stringify({ config, _projectRoot }, undefined, 4));
}
