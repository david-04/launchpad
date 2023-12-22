import { mkdirSync, renameSync, rmSync, writeFileSync } from "fs";
import { LP_NEW_FILE_EXTENSION, LP_OLD_FILE_EXTENSION } from "../../utilities/constants.js";
import { Path } from "../../utilities/path.js";
import { Directory } from "../data/directory.js";
import { type FileOrDirectory } from "../data/file-or-directory-cache.js";

//----------------------------------------------------------------------------------------------------------------------
// A class to create/update/rename/delete files and directories with rollback support
//----------------------------------------------------------------------------------------------------------------------

export class FileSystemOperation {
    private type;
    private hasCreatedNew = false;
    private hasRenamedCurrentToOld = false;
    private hasRenamedNewToCurrent = false;
    private hasDeletedOld = false;
    private readonly path;
    private readonly newPath;
    private readonly oldPath;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(protected readonly fileOrDirectory: FileOrDirectory) {
        this.type = fileOrDirectory.type;
        this.path = fileOrDirectory.absolutePath;
        this.newPath = new Path(`${this.path}${LP_NEW_FILE_EXTENSION}`);
        this.oldPath = new Path(`${this.path}${LP_OLD_FILE_EXTENSION}`);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if any LP_OLD or LP_NEW files already exist
    //------------------------------------------------------------------------------------------------------------------

    public getExistingConflictPaths() {
        return [this.newPath, this.oldPath].flatMap(path => (path.exists() ? [this.path.path] : []));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create the LP_NEW file or directory
    //------------------------------------------------------------------------------------------------------------------

    public createNew(log: Array<string>) {
        try {
            if (!this.fileOrDirectory.mustDelete) {
                if (this.fileOrDirectory instanceof Directory) {
                    mkdirSync(this.newPath.path, { recursive: true });
                } else {
                    const contents = this.fileOrDirectory.contents ?? "";
                    writeFileSync(this.newPath.path, contents, { encoding: "utf-8", flag: "wx" });
                }
                log.push(`Created ${this.type} ${this.newPath.path}`);
                this.hasCreatedNew = true;
            }
        } catch (error) {
            throw new Error(`Failed to create ${this.type} ${this.newPath.path}: ${error}`);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Rename the current file or directory to LP_OLD
    //------------------------------------------------------------------------------------------------------------------

    public renameCurrentToOld(log: Array<string>) {
        try {
            if (this.fileOrDirectory.exists) {
                renameSync(this.path.path, this.oldPath.path);
                log.push(`Renamed ${this.type} ${this.path.path} to ${this.oldPath.path}`);
                this.hasRenamedCurrentToOld = true;
            }
        } catch (error) {
            throw new Error(`Failed to rename ${this.type} ${this.path.path} to ${this.oldPath.path}: ${error}`);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Make the LP_NEW file or directory the current one
    //------------------------------------------------------------------------------------------------------------------

    public renameNewToCurrent(log: Array<string>) {
        try {
            if (!this.hasCreatedNew) {
                renameSync(this.newPath.path, this.path.path);
                this.hasRenamedNewToCurrent;
                log.push(`Renamed ${this.type} ${this.newPath.path} to ${this.path.path}`);
            }
        } catch (error) {
            throw new Error(`Failed to rename ${this.type} ${this.newPath.path} to ${this.path.path}: ${error}`);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Delete the LP_OLD file or directory
    //------------------------------------------------------------------------------------------------------------------

    public deleteOld(log: Array<string>) {
        if (this.hasRenamedCurrentToOld) {
            if (this.fileOrDirectory instanceof Directory) {
                rmSync(this.oldPath.path, { recursive: true });
            } else {
                rmSync(this.oldPath.path);
            }
            log.push(`Deleted ${this.type} ${this.oldPath.path}`);
            this.hasDeletedOld = true;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Roll back all changes
    //------------------------------------------------------------------------------------------------------------------

    public rollBack(log: Array<string>) {
        if (this.hasDeletedOld) {
            throw new Error(`Can't roll back because ${this.type} ${this.oldPath.path} has already been deleted`);
        }
        if (this.hasCreatedNew) {
            const pathToDelete = this.hasRenamedNewToCurrent ? this.path.path : this.newPath.path;
            try {
                rmSync(pathToDelete, this.fileOrDirectory instanceof Directory ? { recursive: true } : {});
            } catch (error) {
                throw new Error(`Failed to delete ${this.type} ${pathToDelete}`);
            }
            log.push(`Deleted ${this.type} ${pathToDelete}`);
            this.hasRenamedNewToCurrent = this.hasCreatedNew = false;
        }
        if (this.hasRenamedCurrentToOld) {
            try {
                renameSync(this.oldPath.path, this.path.path);
            } catch (error) {
                throw new Error(`Failed to rename ${this.type} ${this.oldPath.path} to ${this.path.path}`);
            }
            log.push(`Renamed ${this.type} ${this.oldPath.path} to ${this.path.path}`);
            this.hasRenamedCurrentToOld;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get instructions on how to complete the rollback
    //------------------------------------------------------------------------------------------------------------------

    public getRollbackInstructions() {
        const instructions = new Array<string>();
        if (this.hasCreatedNew) {
            const pathToDelete = this.hasRenamedNewToCurrent ? this.path.path : this.newPath.path;
            instructions.push(`Delete ${this.type} ${pathToDelete}`);
        }
        if (this.hasRenamedCurrentToOld) {
            instructions.push(`Rename ${this.type} ${this.oldPath.path} to ${this.path.path}`);
        }
        return instructions;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get instructions for manually completing the transaction
    //------------------------------------------------------------------------------------------------------------------

    public getCompletionInstructions() {
        return this.hasDeletedOld || !this.hasRenamedCurrentToOld ? [] : [`Delete ${this.type} ${this.oldPath.path}`];
    }
}
