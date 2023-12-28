import * as fs from "fs";
import { normalize, resolve } from "path";
import { LAUNCHPAD_CFG } from "../migration/data/known-files";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a file system path (file or directory)
//----------------------------------------------------------------------------------------------------------------------

export class Path {
    public readonly path: string;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(_path: string) {
        this.path = Path.normalize(_path);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Normalize the given path
    //------------------------------------------------------------------------------------------------------------------

    private static normalize(path: string) {
        const normalized = normalize(resolve(path));
        return normalized.match(/^[a-z]:/i)
            ? normalized.substring(0, 1).toUpperCase() + normalized.substring(1).replace(/\\/g, "/")
            : normalized;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Construct a child path or get the parent
    //------------------------------------------------------------------------------------------------------------------

    public child(name: string) {
        return new Path(`${this.path}/${name}`);
    }

    public getParent() {
        return new Path(this.path.substring(0, this.path.lastIndexOf("/")));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check a paths existence and type
    //------------------------------------------------------------------------------------------------------------------

    public exists() {
        return fs.existsSync(this.path);
    }

    public existsAndIsFile() {
        return this.exists() && this.getProperties().isFile();
    }

    public existsAndIsDirectory() {
        return this.exists() && this.getProperties().isDirectory();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get file properties
    //------------------------------------------------------------------------------------------------------------------

    public getProperties() {
        return fs.lstatSync(this.path);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Load the file contents
    //------------------------------------------------------------------------------------------------------------------

    public loadFileContents() {
        return fs.readFileSync(this.path).toString();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Append to the file
    //------------------------------------------------------------------------------------------------------------------

    public appendFileContents(contents: string | ReadonlyArray<string>) {
        return fs.appendFileSync(this.path, "string" === typeof contents ? contents : contents.join("\n"));
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get the config file's path
//----------------------------------------------------------------------------------------------------------------------

export function getConfigFilePath(projectRoot: Path) {
    return projectRoot.child(LAUNCHPAD_CFG);
}
