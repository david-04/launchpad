import { fail } from "../../utilities/fail.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a single file that can be created/modified/deleted
//----------------------------------------------------------------------------------------------------------------------

export class File {
    public readonly absolutePath: Path;
    public readonly originalContents: string | undefined;
    private newContents: string | undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(projectRoot: Path, public readonly relativePath: string, private readonly tabSize: number) {
        this.absolutePath = projectRoot.child(relativePath);
        if (this.absolutePath.existsAndIsDirectory()) {
            fail(`${this.absolutePath.path} is a directory (expected it to be a file)`);
        } else if (this.absolutePath.exists()) {
            this.originalContents = File.serialize(this.absolutePath.loadFileContents(), tabSize);
            this.newContents = this.originalContents;
        } else {
            this.originalContents = undefined;
            this.newContents = undefined;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and setters
    //------------------------------------------------------------------------------------------------------------------

    public get contents() {
        return this.newContents;
    }

    public set contents(contents: string | undefined) {
        this.newContents = undefined === contents ? contents : File.serialize(contents, this.tabSize);
    }

    public get lines() {
        return this.newContents?.replace(/(\n\s)+$/, "").split("\n");
    }

    public set lines(lines: ReadonlyArray<string> | undefined) {
        this.newContents = undefined === lines ? lines : File.serialize(lines, this.tabSize);
    }

    public get json() {
        return undefined === this.newContents ? undefined : JSON.parse(this.newContents.replace(/(\n\s)+$/, ""));
    }

    public set json(json: Exclude<object, null>) {
        this.newContents = undefined === json ? json : File.serialize(json, this.tabSize);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine the status
    //------------------------------------------------------------------------------------------------------------------

    public mustCreateOrOverwrite() {
        return undefined !== this.newContents && this.newContents !== this.originalContents;
    }

    public mustDelete() {
        return undefined !== this.originalContents && undefined === this.newContents;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Serialize file contents into a string
    //------------------------------------------------------------------------------------------------------------------

    private static serialize(contents: string | ReadonlyArray<string> | object, tabSize: number) {
        const normalize = (text: string) => text.replaceAll("\r", "").replace(/(\s\n)+$/, "") + "\n";
        if ("string" === typeof contents) {
            return normalize(contents);
        } else if (Array.isArray(contents)) {
            return normalize(contents.join("\n"));
        } else {
            return normalize(JSON.stringify(contents, undefined, tabSize));
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Representation of a directory
//----------------------------------------------------------------------------------------------------------------------

export class Directory {
    public readonly absolutePath: Path;
    public readonly exists: boolean;
    private shouldExist: boolean;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(projectRoot: Path, public readonly relativePath: string) {
        this.absolutePath = projectRoot.child(relativePath);
        if (this.absolutePath.existsAndIsFile()) {
            fail(`${this.absolutePath.path} is a file (expected it to be a directory)`);
        }
        this.exists = this.absolutePath.exists();
        this.shouldExist = this.exists;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and setters
    //------------------------------------------------------------------------------------------------------------------

    public create() {
        this.shouldExist = true;
    }

    public delete() {
        this.shouldExist = false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine the status
    //------------------------------------------------------------------------------------------------------------------

    public mustCreate() {
        return !this.exists && this.shouldExist;
    }

    public mustDelete() {
        return this.exists && !this.shouldExist;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// A cache to accumulate pending changes to files
//----------------------------------------------------------------------------------------------------------------------

export class FileOrDirectoryCache<T extends File | Directory> {
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
}
