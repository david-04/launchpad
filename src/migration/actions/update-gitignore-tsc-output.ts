import { TSBUILDINFO } from "../data/known-files";
import { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// TypeScript output
//----------------------------------------------------------------------------------------------------------------------

export function updateGitignoreTscOutput(context: MigrationContext) {
    const oldTscOutDir = context.oldConfig?.tscOutDir;
    const newTscOutDir = context.newConfig.tscOutDir;
    const currentGlobs = ["**/*.js", "**/*.d.js", "**/*.js.map", TSBUILDINFO] as const;
    const deprecatedGlobs = [] as const;
    const allGlobs = [...currentGlobs, ...deprecatedGlobs];
    if (oldTscOutDir && oldTscOutDir !== newTscOutDir) {
        allGlobs.forEach(glob => context.fileOperations.gitignore.remove(`/${oldTscOutDir}/${glob}`));
    }
    currentGlobs.forEach(glob => context.fileOperations.gitignore.add(`/${newTscOutDir}/${glob}`));
}
