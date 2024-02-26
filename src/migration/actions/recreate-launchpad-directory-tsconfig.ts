import { TSCONFIG_JSON_TEMPLATES } from "../../resources/embedded-tsconfig";
import { LAUNCHPAD_TSCONFIG_DEFAULT_JSON } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/tsconfig.default.json
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryTsConfig(context: MigrationContext) {
    const { artifact, moduleSystem, runtime } = context.newConfig;
    const normalizedRuntime = "node" === runtime.value ? "cli" : runtime.value;
    const file = `tsconfig.${normalizedRuntime}-${artifact}-${moduleSystem}.json` as const;
    const tsconfig = TSCONFIG_JSON_TEMPLATES[file];
    const compilerOptionsOverride = getPreactCompilerOptionsOverride(context);
    const tsconfigWithOverrides = {
        ...tsconfig,
        compilerOptions: {
            ...tsconfig.compilerOptions,
            ...compilerOptionsOverride,
        },
    };
    const stringified = JSON.stringify(tsconfigWithOverrides, undefined, context.newConfig.tabSize)
        .replaceAll("__SRC_DIR__", normalizeDirectory(context.newConfig.srcDir))
        .replaceAll("__OUT_DIR__", normalizeDirectory(context.newConfig.tscOutDir));
    context.files.get(LAUNCHPAD_TSCONFIG_DEFAULT_JSON).contents = `${stringified}\n`;
}

function getPreactCompilerOptionsOverride(context: MigrationContext) {
    return context.fileOperations.packageJson.containsDependency("preact") ? { jsxFactory: "h" } : {};
}

function normalizeDirectory(directory: string) {
    return JSON.stringify(`../${directory}`).replace(/^"/, "").replace(/"$/, "");
}
