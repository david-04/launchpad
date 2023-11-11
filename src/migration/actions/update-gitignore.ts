import type { OldConfig } from "../../config/config-objects.js";
import { TSBUILDINFO } from "../data/known-files.js";
import type { MigrationContext } from "../data/migration-context.js";
import type { GitignoreOperations } from "../files/gitignore.js";

//----------------------------------------------------------------------------------------------------------------------
// Update .gitignore
//----------------------------------------------------------------------------------------------------------------------

export function updateGitignore(context: MigrationContext) {
    const gitignore = context.fileOperations.gitignore;
    updateGitignorePackageManager(context, gitignore);
    updateGitignoreTypeScriptOutput(context, gitignore);
    updateGitignoreBundlerOutput(context, gitignore);
}

//----------------------------------------------------------------------------------------------------------------------
// Package manager
//----------------------------------------------------------------------------------------------------------------------

function updateGitignorePackageManager(context: MigrationContext, gitignore: GitignoreOperations) {
    gitignore.add("/node_modules");
    updateGitignoreNpm(context);
    updateGitignorePnpm(context);
    updateGitignoreYarn(context);
}

function updateGitignoreNpm(context: MigrationContext) {
    updateGitignorePackageManagerPatterns(context, "npm", []);
}

function updateGitignorePnpm(context: MigrationContext) {
    updateGitignorePackageManagerPatterns(context, "pnpm", []);
}

function updateGitignoreYarn(context: MigrationContext) {
    updateGitignorePackageManagerPatterns(context, "yarn", [
        "/.pnp.*",
        "/.yarn/*",
        "!/.yarn/patches",
        "!/.yarn/plugins",
        "!/.yarn/releases",
        "!/.yarn/sdks",
        "!/.yarn/versions",
    ]);
}

function updateGitignorePackageManagerPatterns(
    context: MigrationContext,
    packageManager: OldConfig["packageManager"]["value"],
    patterns: ReadonlyArray<string>
) {
    const wasActiveBefore = context.oldConfig?.packageManager?.value === packageManager;
    const isActiveAfter = context.newConfig.packageManager.value !== packageManager;
    if (wasActiveBefore && !isActiveAfter) {
        patterns.forEach(pattern => context.fileOperations.gitignore.remove(pattern));
    } else if (!wasActiveBefore && isActiveAfter) {
        patterns.forEach(pattern => context.fileOperations.gitignore.remove(pattern));
    }
}

//----------------------------------------------------------------------------------------------------------------------
// TypeScript output
//----------------------------------------------------------------------------------------------------------------------

function updateGitignoreTypeScriptOutput(context: MigrationContext, gitignore: GitignoreOperations) {
    updateGitignoreTypeScriptOutputDirectory(context, gitignore);
    updateGitignoreTypeScriptOutputBuildInfo(context, gitignore);
}

function updateGitignoreTypeScriptOutputBuildInfo(context: MigrationContext, gitignore: GitignoreOperations) {
    if (context.oldConfig?.tscOutDir && context.oldConfig?.tscOutDir !== context.newConfig.tscOutDir) {
        gitignore.remove(`/${context.oldConfig.tscOutDir}/${TSBUILDINFO}`);
    }
    gitignore.add(`/${context.newConfig.tscOutDir}/${TSBUILDINFO}`);
}

function updateGitignoreTypeScriptOutputDirectory(context: MigrationContext, gitignore: GitignoreOperations) {
    const oldPattern = context.oldConfig?.tscOutDir ? `/${context.oldConfig.tscOutDir}` : undefined;
    const newPattern = `/${context.newConfig.tscOutDir}`;
    if (undefined === oldPattern || !gitignore.file.exists) {
        gitignore.add(newPattern);
    } else if (oldPattern !== newPattern && gitignore.containsActive(oldPattern)) {
        gitignore.remove(oldPattern);
        gitignore.add(newPattern);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Bundler output
//----------------------------------------------------------------------------------------------------------------------

function updateGitignoreBundlerOutput(context: MigrationContext, gitignore: GitignoreOperations) {
    const oldPattern =
        undefined !== context.oldConfig?.bundler &&
        "disabled" !== context.oldConfig?.bundler?.value &&
        context.oldConfig.bundlerOutDir
            ? `/${context.oldConfig.bundlerOutDir}/${context.newConfig.projectName}.*`
            : undefined;
    const newPattern =
        "disabled" !== context.newConfig.bundler.value && context.newConfig.bundlerOutDir
            ? `/${context.newConfig.bundlerOutDir}/${context.newConfig.projectName}.*`
            : undefined;
    if (newPattern && (!gitignore.file.exists || "disabled" === context.oldConfig?.bundler?.value)) {
        gitignore.add(newPattern);
    } else if (oldPattern && newPattern && oldPattern !== newPattern && gitignore.containsActive(oldPattern)) {
        gitignore.remove(oldPattern);
        gitignore.add(newPattern);
    }
}
