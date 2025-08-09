import { TSCONFIG_JSON_TEMPLATES } from "../../resources/embedded-tsconfig.generated";
import { LAUNCHPAD_NODE_MIN_DTS, LAUNCHPAD_TSCONFIG_DEFAULT_JSON } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/tsconfig.default.json
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryTsConfig(context: MigrationContext) {
    const { artifact, moduleSystem, runtime } = context.newConfig;
    const normalizedRuntime = "node" === runtime.value ? "cli" : runtime.value;
    const file = `tsconfig.${normalizedRuntime}-${artifact}-${moduleSystem}.json` as const;
    const tsconfig = TSCONFIG_JSON_TEMPLATES[file];
    const compilerOptionsOverridePreact = getCompilerOptionsOverridePreact(context);
    const compilerOptionsOverrideLib = getCompilerOptionsOverrideLib(context, tsconfig.compilerOptions.target);
    const includeAppendNodeMinDts = getIncludeAppendNodeMinDts(context);
    const tsconfigWithOverrides = {
        ...tsconfig,
        compilerOptions: {
            ...tsconfig.compilerOptions,
            ...compilerOptionsOverridePreact,
            ...compilerOptionsOverrideLib,
        },
        include: [...tsconfig.include, ...includeAppendNodeMinDts],
    };
    const stringified = JSON.stringify(tsconfigWithOverrides, undefined, context.newConfig.tabSize)
        .replaceAll("__SRC_DIR__", normalizeDirectory(context.newConfig.srcDir))
        .replaceAll("__OUT_DIR__", normalizeDirectory(context.newConfig.tscOutDir));
    context.files.get(LAUNCHPAD_TSCONFIG_DEFAULT_JSON).contents = `${stringified}\n`;
}

function getCompilerOptionsOverridePreact(context: MigrationContext) {
    return context.fileOperations.packageJson.containsDependency("preact") ? { jsx: "react", jsxFactory: "h" } : {};
}

function getCompilerOptionsOverrideLib(context: MigrationContext, target: string) {
    return context.newConfig.runtime.value === "web" ? {} : { lib: [target] };
}

function getIncludeAppendNodeMinDts(context: MigrationContext) {
    const isCli = context.newConfig.runtime.value !== "web";
    const hasNodeTypes = context.fileOperations.packageJson.containsDependency("@types/node");
    return isCli && !hasNodeTypes ? [`../${LAUNCHPAD_NODE_MIN_DTS}`] : [];
}

function normalizeDirectory(directory: string) {
    return JSON.stringify(`../${directory}`).replace(/^"/, "").replace(/"$/, "");
}
