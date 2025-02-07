import { TSBUILDINFO } from "../data/known-files";
import { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// TypeScript output
//----------------------------------------------------------------------------------------------------------------------

export function updateGitignoreTscOutput(context: MigrationContext) {
    const oldTscOutDir = context.oldConfig?.tscOutDir;
    const newTscOutDir = context.newConfig.tscOutDir;
    const currentGlobs = [
        "**/*.cjs",
        "**/*.cjs.map",
        "**/*.d.cjs",
        "**/*.d.js",
        "**/*.d.jsx",
        "**/*.d.mjs",
        "**/*.js",
        "**/*.js.map",
        "**/*.jsx",
        "**/*.jsx.map",
        "**/*.mjs",
        "**/*.mjs.map",
        TSBUILDINFO,
        ".timestamp.*",
    ] as const;
    const deprecatedGlobs = [] as const;
    const allGlobs = [...currentGlobs, ...deprecatedGlobs];
    if (oldTscOutDir && oldTscOutDir !== newTscOutDir) {
        allGlobs.forEach(glob => context.fileOperations.gitignore.remove(`/${oldTscOutDir}/${glob}`));
    }
    currentGlobs.forEach(glob => context.fileOperations.gitignore.add(`/${newTscOutDir}/${glob}`));
}
