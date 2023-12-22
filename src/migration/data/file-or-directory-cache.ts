import type { Path } from "../../utilities/path.js";
import { FileSystemOperation } from "../executor/file-system-operation.js";
import type { Directory } from "./directory.js";
import { File } from "./file.js";

export type FileOrDirectory = File | Directory;

//----------------------------------------------------------------------------------------------------------------------
// A cache to accumulate pending changes to files
//----------------------------------------------------------------------------------------------------------------------

export class FileOrDirectoryCache<T extends FileOrDirectory> {
    private readonly filesOrDirectories = new Map<string, T>();
    private readonly instantiate;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly projectRoot: Path,
        tabSize: number,
        instantiate: (projectRoot: Path, relativePath: string, tabSize: number) => T
    ) {
        this.instantiate = (projectRoot: Path, relativePath: string) => instantiate(projectRoot, relativePath, tabSize);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Retrieve or create a file or directory
    //------------------------------------------------------------------------------------------------------------------

    public get(path: string) {
        const fileOrDirectory = this.filesOrDirectories.get(path) ?? this.instantiate(this.projectRoot, path);
        this.filesOrDirectories.set(path, fileOrDirectory);
        return fileOrDirectory;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert all new/modified/deleted items to a file system operation
    //------------------------------------------------------------------------------------------------------------------

    public toFileSystemOperations() {
        const fileSystemOperations = new Array<FileSystemOperation>();
        for (const fileOrDirectory of this.filesOrDirectories.values()) {
            if (fileOrDirectory instanceof File) {
                if (fileOrDirectory.mustCreateOrOverwrite() || fileOrDirectory.mustDelete()) {
                    fileSystemOperations.push(new FileSystemOperation(fileOrDirectory));
                }
            } else {
                if (fileOrDirectory.mustCreate() || fileOrDirectory.mustDelete()) {
                    fileSystemOperations.push(new FileSystemOperation(fileOrDirectory));
                }
            }
        }
        return fileSystemOperations;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get a summary of changes
    //------------------------------------------------------------------------------------------------------------------

    public toSummaryOfChanges() {
        const changes = new Array<string>();
        for (const fileOrDirectory of this.filesOrDirectories.values()) {
            changes.push(...fileOrDirectory.getSummaryOfChanges());
        }
        return changes;
    }
}
