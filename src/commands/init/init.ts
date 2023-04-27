import { CONFIG_PROPERTIES } from "../../config/config-properties.js";
import { loadConfigFile } from "../../config/old-config.js";
import { fail } from "../../utilities/fail.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(options: ReadonlyArray<string>, _projectRoot: Path, _configFile: Path) {
    if (options.length) {
        fail(`Invalid arguments: The "init" command does not accept any parameters`);
    }
    const config = loadConfigFile(_configFile, CONFIG_PROPERTIES);
    console.log(JSON.stringify({ config, _projectRoot }, undefined, 4));
}
