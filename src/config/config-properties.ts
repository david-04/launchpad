import {
    createReducer,
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
        parse: createReducer(parseVersion, version => ({ version })),
    },
    {
        key: "LP_SETTINGS_RUNTIME",
        parse: createReducer(parseRuntime, runtime => ({ runtime })),
    },
    {
        key: "LP_SETTINGS_ARTIFACT",
        parse: createReducer(parseArtifact, artifact => ({ artifact })),
    },
    {
        key: "LP_SETTINGS_MODULE",
        parse: createReducer(parseModule, module => ({ module })),
    },
    {
        key: "LP_SETTINGS_SRC_DIR",
        parse: createReducer(parseSrcDir, srcDir => ({ srcDir })),
    },
    {
        key: "LP_SETTINGS_TSC_OUT_DIR",
        parse: createReducer(parseTscOutDir, tscOutDir => ({ tscOutDir })),
    },
    {
        key: "LP_SETTINGS_BUNDLER_OUT_DIR",
        parse: createReducer(parseBundlerOutDir, bundlerOutDir => ({ bundlerOutDir })),
    },
    {
        key: "LP_SETTINGS_BUNDLER",
        parse: createReducer(parseBundler, bundler => ({ bundler })),
    },
    {
        key: "LP_SETTINGS_FORMATTER",
        parse: createReducer(parseFormatter, formatter => ({ formatter })),
    },
    {
        key: "LP_SETTINGS_PACKAGE_MANAGER",
        parse: createReducer(parsePackageManager, packageManager => ({ packageManager })),
    },
] as const;
