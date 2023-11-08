import { parseCommandLineOptions } from "../../config/command-line-parser.js";
import { loadConfigFile, type ParsedConfig } from "../../config/config-loader.js";
import type { NewConfig, OldConfig, OldPartialConfig } from "../../config/config-objects.js";
import { migrate } from "../../migrations/migrate.js";
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
        oldConfig: getOldConfig(parsedConfig, newConfig),
        newConfig,
        projectRoot,
    });
}

function getOldConfig(parsedConfig: ParsedConfig | undefined, newConfig: NewConfig) {
    if (!parsedConfig) {
        return undefined;
    } else if (parsedConfig?.validated) {
        return parsedConfig.validated;
    } else {
        return patchOldConfig(parsedConfig.partial, newConfig);
    }
}

function patchOldConfig(oldConfig: OldPartialConfig, newConfig: NewConfig): OldConfig {
    return {
        artifact: oldConfig.artifact ?? newConfig.artifact,
        bundler: oldConfig.bundler ?? newConfig.bundler,
        bundlerOutDir: oldConfig.bundlerOutDir ?? newConfig.bundlerOutDir,
        dtsBundler: oldConfig.dtsBundler ?? newConfig.dtsBundler,
        formatter: oldConfig.formatter ?? newConfig.formatter,
        installationMode: oldConfig.installationMode ?? newConfig.installationMode,
        module: oldConfig.module ?? newConfig.module,
        packageManager: oldConfig.packageManager ?? newConfig.packageManager,
        projectName: oldConfig.projectName ?? newConfig.projectName,
        runtime: oldConfig.runtime ?? newConfig.runtime,
        srcDir: oldConfig.srcDir ?? newConfig.srcDir,
        tabSize: oldConfig.tabSize ?? newConfig.tabSize,
        tscOutDir: oldConfig.tscOutDir ?? newConfig.tscOutDir,
        version: oldConfig.version ?? newConfig.version,
        webAppDir: oldConfig.webAppDir ?? newConfig.webAppDir,
    };
}
