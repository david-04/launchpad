import { loadConfigFile } from "../../config/v1/load-config.js";
import type { Path } from "../../utilities/path.js";
import { getNewConfig } from "./config-wizard.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function init(projectRoot: Path, configFile: Path, _options: ReadonlyArray<string>) {
    const oldConfig = loadConfigFile(configFile);
    console.log(oldConfig);
    /*const newConfig =*/ await getNewConfig(projectRoot, oldConfig?.config);
}
