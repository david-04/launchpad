import type { MigrationContext } from "../data/migration-context.js";
import type { FileSystemOperation } from "./file-system-operation.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type FileSystemOperations = Readonly<Record<"files" | "directories", ReadonlyArray<FileSystemOperation>>>;

//----------------------------------------------------------------------------------------------------------------------
// Apply file system changes
//----------------------------------------------------------------------------------------------------------------------

export function applyFileSystemChanges(context: MigrationContext) {
    const operations: FileSystemOperations = {
        files: context.files.toFileSystemOperations(),
        directories: context.files.toFileSystemOperations(),
    };
    prepareFileSystemChanges(context, operations);
    if (undefined === context.manualActionRequired) {
        finalizeFileSystemChanges(context, operations);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Move the old files/directories out of the way and create the new ones
//----------------------------------------------------------------------------------------------------------------------

function prepareFileSystemChanges(context: MigrationContext, operations: FileSystemOperations) {
    try {
        [operations.directories, operations.files].forEach(filesOrDirectories => {
            filesOrDirectories.forEach(fileOrDirectory => {
                fileOrDirectory.createNew(context.activityLog);
                fileOrDirectory.renameCurrentToOld(context.activityLog);
                fileOrDirectory.renameNewToCurrent(context.activityLog);
            });
        });
    } catch (error) {
        context.activityLog.push(`Encountered an error: ${error}`);
        context.activityLog.push(`Rolling back changes...`);
        rollBackFileSystemChanges(context, operations);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Roll back all changes
//----------------------------------------------------------------------------------------------------------------------

function rollBackFileSystemChanges(context: MigrationContext, operations: FileSystemOperations) {
    try {
        [operations.files, operations.directories].forEach(filesOrDirectories => {
            filesOrDirectories.forEach(fileOrDirectory => {
                fileOrDirectory.rollBack(context.activityLog);
            });
        });
    } catch (error) {
        context.activityLog.push(`Encountered an error during the rollback: ${error}`);
        context.manualActionRequired = "rollback";
        context.manualActionInstructions.push(
            ...[...operations.directories, ...operations.files].flatMap(item => item.getRollbackInstructions())
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Remove the old files/directories
//----------------------------------------------------------------------------------------------------------------------

function finalizeFileSystemChanges(context: MigrationContext, operations: FileSystemOperations) {
    try {
        [operations.files, operations.directories].forEach(filesOrDirectories => {
            filesOrDirectories.forEach(fileOrDirectory => {
                fileOrDirectory.deleteOld(context.activityLog);
            });
        });
    } catch (error) {
        context.activityLog.push(`Encountered an error: ${error}`);
        context.manualActionRequired = "complete";
        context.manualActionInstructions.push(
            ...[...operations.directories, ...operations.files].flatMap(item => item.getCompletionInstructions())
        );
    }
}
