import { MigrationContext } from "migration/data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Bundler output
//----------------------------------------------------------------------------------------------------------------------

export function updateGitignoreBundlerOutput(context: MigrationContext) {
    const oldBundlerOutDir = context.oldConfig?.bundlerOutDir;
    const newBundlerOutDir = context.newConfig.bundlerOutDir;
    const currentGlobs = ["**/*.js", "**/*.d.js", "**/*.js.map"] as const;
    const deprecatedGlobs = [] as const;
    const allGlobs = [...currentGlobs, ...deprecatedGlobs];
    if (oldBundlerOutDir && oldBundlerOutDir !== newBundlerOutDir) {
        allGlobs.forEach(glob => context.fileOperations.gitignore.remove(`/${oldBundlerOutDir}/${glob}`));
    }
    if (!oldBundlerOutDir || oldBundlerOutDir !== newBundlerOutDir) {
        currentGlobs.forEach(glob => context.fileOperations.gitignore.add(`/${oldBundlerOutDir}/${glob}`));
    }
}