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

    public constructor(projectRoot: Path, tab: number) {
        this.files = new FileOrDirectoryCache(projectRoot, tab, (root, path, tabSize) => new File(root, path, tabSize));
        this.directories = new FileOrDirectoryCache(projectRoot, tab, (root, path) => new Directory(root, path));
    }
}
