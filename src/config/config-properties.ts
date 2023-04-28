import {
    createParser,
    parseArtifact,
    parseBundler,
    parseBundlerOutDir,
    parseFormatter,
    parseModule,
    parsePackageManager,
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
    },
    {
        key: "LP_SETTINGS_RUNTIME",
        parse: createParser(parseRuntime, runtime => ({ runtime })),
    },
    {
        key: "LP_SETTINGS_ARTIFACT",
        parse: createParser(parseArtifact, artifact => ({ artifact })),
    },
    {
        key: "LP_SETTINGS_MODULE",
        parse: createParser(parseModule, module => ({ module })),
    },
    {
        key: "LP_SETTINGS_SRC_DIR",
        parse: createParser(parseSrcDir, srcDir => ({ srcDir })),
    },
    {
        key: "LP_SETTINGS_TSC_OUT_DIR",
        parse: createParser(parseTscOutDir, tscOutDir => ({ tscOutDir })),
    },
    {
        key: "LP_SETTINGS_BUNDLER_OUT_DIR",
        parse: createParser(parseBundlerOutDir, bundlerOutDir => ({ bundlerOutDir })),
    },
    {
        key: "LP_SETTINGS_BUNDLER",
        parse: createParser(parseBundler, bundler => ({ bundler })),
    },
    {
        key: "LP_SETTINGS_FORMATTER",
        parse: createParser(parseFormatter, formatter => ({ formatter })),
    },
    {
        key: "LP_SETTINGS_PACKAGE_MANAGER",
        parse: createParser(parsePackageManager, packageManager => ({ packageManager })),
    },
] as const;
