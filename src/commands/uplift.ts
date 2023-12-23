import { loadConfigFile } from "../config/config-loader";
import { migrate } from "../migration/migrate";
import { fail } from "../utilities/fail";
import type { Path } from "../utilities/path";
import { breakLine } from "../utilities/string-utilities";

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
        console.log("Uplifting the project...");
        migrate({ operation: "uplift", oldConfig, newConfig: undefined, projectRoot });
    }
    console.log("✅ Successfully uplifted the project");
}
