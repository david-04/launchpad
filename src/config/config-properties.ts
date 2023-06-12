import {
    createParser,
    parseArtifact,
    parseBundler,
    parseBundlerDts,
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
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_ARTIFACT",
        parse: createParser(parseArtifact, artifact => ({ artifact })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_RUNTIME",
        parse: createParser(parseRuntime, runtime => ({ runtime })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_MODULE",
        parse: createParser(parseModule, module => ({ module })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_BUNDLER",
        parse: createParser(parseBundler, bundler => ({ bundler })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_BUNDLER_DTS",
        parse: createParser(parseBundlerDts, bundlerDts => ({ bundlerDts })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_FORMATTER",
        parse: createParser(parseFormatter, formatter => ({ formatter })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_PACKAGE_MANAGER",
        parse: createParser(parsePackageManager, packageManager => ({ packageManager })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_SRC_DIR",
        parse: createParser(parseSrcDir, srcDir => ({ srcDir })),
        mandatory: true,
    },
    {
        key: "LP_SETTINGS_TSC_OUT_DIR",
        parse: createParser(parseTscOutDir, tscOutDir => ({ tscOutDir })),
        mandatory: true,
    },
] as const;
