import type { Path } from "../../utilities/path.js";
import { Directory, File, FileOrDirectoryCache } from "./file-cache.js";

//----------------------------------------------------------------------------------------------------------------------
// A collection of commands to run and files/directories to create/update/delete
//----------------------------------------------------------------------------------------------------------------------

export class PendingChanges {
    public readonly preCommands = new Array<string>();
    public readonly files;
    public readonly directories;
    public readonly postCommands = new Array<string>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(projectRoot: Path, tabSize: number) {
        this.files = new FileOrDirectoryCache(
            projectRoot,
            tabSize,
            (projectRoot, relativePath, tabSize) => new File(projectRoot, relativePath, tabSize)
        );
        this.directories = new FileOrDirectoryCache(
            projectRoot,
            tabSize,
            (projectRoot, relativePath) => new Directory(projectRoot, relativePath)
        );
    }
}
