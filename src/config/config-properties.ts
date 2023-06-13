import { createExtractor } from "./new-config.js";
import {
    createParser,
    parseArtifact,
    parseBundler,
    parseBundlerDts,
    parseFormatter,
    parseModule,
    parsePackageManager,
    parseProjectName,
    parseRuntime,
    parseSrcDir,
    parseTscOutDir,
    parseVersion,
} from "./old-config.js";

//----------------------------------------------------------------------------------------------------------------------
// Configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const CONFIG_PROPERTIES = [
    {
        key: "LP_SETTINGS_VERSION",
        parse: createParser(parseVersion, version => ({ version })),
        extract: createExtractor(config => config.version),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_PROJECT_NAME",
        parse: createParser(parseProjectName, projectName => ({ projectName })),
        extract: createExtractor(config => config.projectName),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_ARTIFACT",
        parse: createParser(parseArtifact, artifact => ({ artifact })),
        extract: createExtractor(config => config.artifact),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_RUNTIME",
        parse: createParser(parseRuntime, runtime => ({ runtime })),
        extract: createExtractor(config => config.runtime),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_MODULE",
        parse: createParser(parseModule, module => ({ module })),
        extract: createExtractor(config => config.module),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_BUNDLER",
        parse: createParser(parseBundler, bundler => ({ bundler })),
        extract: createExtractor(config => config.bundler),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_BUNDLER_DTS",
        parse: createParser(parseBundlerDts, bundlerDts => ({ bundlerDts })),
        extract: createExtractor(config => config.bundlerDts),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_FORMATTER",
        parse: createParser(parseFormatter, formatter => ({ formatter })),
        extract: createExtractor(config => config.formatter),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_PACKAGE_MANAGER",
        parse: createParser(parsePackageManager, packageManager => ({ packageManager })),
        extract: createExtractor(config => config.packageManager),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_SRC_DIR",
        parse: createParser(parseSrcDir, srcDir => ({ srcDir })),
        extract: createExtractor(config => config.srcDir),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_TSC_OUT_DIR",
        parse: createParser(parseTscOutDir, tscOutDir => ({ tscOutDir })),
        extract: createExtractor(config => config.tscOutDir),
        mandatory: true,
    },
] as const;
