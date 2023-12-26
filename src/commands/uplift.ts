import { loadConfigFile } from "../config/config-loader";
import { migrate } from "../migration/migrate";
import { fail } from "../utilities/fail";
import type { Path } from "../utilities/path";
import { breakLine } from "../utilities/string-utilities";

//----------------------------------------------------------------------------------------------------------------------
// Initialize a new project
//----------------------------------------------------------------------------------------------------------------------

export async function uplift(projectRoot: Path, configFile: Path, options: ReadonlyArray<string>) {
    const commandLineOptions = parseCommandLineOptions(options);
    const parsedConfig = loadConfigFile(configFile);
    const oldConfig = parsedConfig?.validated;
    if (!parsedConfig) {
        fail(`Config file ${configFile.path} does not exist`);
    } else if (!oldConfig) {
        const lines = [`Failed to load config file ${configFile.path}`];
        if (parsedConfig.errors) {
            if (1 === parsedConfig.errors.length) {
                parsedConfig.errors.map(line => lines.push(line));
                lines.push('Correct the error manually or run "launchpad init" to reconfigure/reset the project');
            } else {
                lines.push("");
                parsedConfig.errors.map(line => lines.push(`- ${line}`));
                lines.push("");
                lines.push('Correct the errors manually or run "launchpad init" to reconfigure/reset the project');
            }
        } else {
            lines.push('Try running "launchpad init" to reconfigure/reset the project');
        }
        fail(lines.flatMap(breakLine).join("\n"));
    } else {
        const project = oldConfig.projectName ? `project ${oldConfig.projectName}` : "the project";
        console.log(`Uplifting ${project}...`);
        migrate({ operation: "uplift", oldConfig, newConfig: undefined, projectRoot, ...commandLineOptions });
        console.log("");
        console.log(`✅ Successfully uplifted ${project}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse command line options
//----------------------------------------------------------------------------------------------------------------------

function parseCommandLineOptions(options: ReadonlyArray<string>) {
    const result = { upliftDependenciesOverride: false };
    for (const option of options.map(option => option.trim())) {
        if (["all", "a", "--all", "-all", "-a"].includes(option)) {
            result.upliftDependenciesOverride = true;
        } else if (option) {
            fail(`Invalid command line option: "${option}"`);
        }
    }
    return result as Readonly<typeof result>;
}
