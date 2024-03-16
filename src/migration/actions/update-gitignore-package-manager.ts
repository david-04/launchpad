import { MigrationContext } from "../data/migration-context";
import { getAllPackageManagers, getPackageManager } from "../package-managers/package-manager-registry";

//----------------------------------------------------------------------------------------------------------------------
// Add/remove package manager .gitignore patterns
//----------------------------------------------------------------------------------------------------------------------

export function updateGitignorePackageManager(context: MigrationContext) {
    const { gitignore } = context.fileOperations;
    const patternsToAdd = new Set(getPackageManager(context).gitignorePatterns.current);
    getAllPackageManagers()
        .map(packageManager => packageManager.gitignorePatterns)
        .flatMap(gitignorePatterns => [...gitignorePatterns.current, ...gitignorePatterns.deprecated])
        .filter(pattern => !patternsToAdd.has(pattern))
        .forEach(pattern => gitignore.remove(pattern));
    patternsToAdd.forEach(pattern => gitignore.add(pattern));
}
