import { loadConfigFile } from "../../config/config-loader.js";
import { migrate } from "../../migration/migrate.js";
import { fail } from "../../utilities/fail.js";
import { breakLine } from "../../utilities/logging.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function uplift(projectRoot: Path, configFile: Path, _options: ReadonlyArray<string>) {
    const parsedConfig = loadConfigFile(configFile);
    const oldConfig = parsedConfig?.validated;
    if (!parsedConfig) {
        fail(`Config file ${configFile.path} does not exist`);
    } else if (!oldConfig) {
        const lines = [`Failed to load config file ${configFile.path}`];
        if (parsedConfig.errors) {
            const prefix = 1 === parsedConfig.errors.length ? "- " : "";
            if (1 < parsedConfig.errors.length) {
                lines.push("");
            }
            parsedConfig.errors.map(line => lines.push(`${prefix}${line}`));
        }
        fail(lines.flatMap(breakLine).join("\n"));
    } else {
        migrate({
            canPromptUser: true,
            canRunPackageManagerCommands: true,
            oldConfig: parsedConfig,
            newConfig: undefined,
            projectRoot,
        });
    }
}
