import { fail } from "../../utilities/fail";
import type { Path } from "../../utilities/path";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a single file that can be created/modified/deleted
//----------------------------------------------------------------------------------------------------------------------

export class File {
    public readonly type = "file";
    public readonly absolutePath: Path;
    public readonly originalContents: string | undefined;
    private newContents: string | undefined;
    private executable = false;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        projectRoot: Path,
        public readonly relativePath: string,
        private readonly tabSize: number
    ) {
        this.absolutePath = projectRoot.child(relativePath);
        if (this.absolutePath.existsAndIsDirectory()) {
            fail(`${this.absolutePath.path} is a directory (expected it to be a file)`);
        } else if (this.absolutePath.exists()) {
            this.originalContents = File.normalize(this.absolutePath.loadFileContents());
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
        return this.newContents?.replace(/(\s*\r?\n\s*)+$/, "").split(/\r?\n/);
    }

    public set lines(lines: ReadonlyArray<string> | undefined) {
        this.newContents = undefined === lines ? lines : File.serialize(lines, this.tabSize);
    }

    public get json() {
        try {
            return undefined === this.newContents ? undefined : JSON.parse(this.newContents.replace(/(\n\s)+$/, ""));
        } catch (error) {
            return fail(`Failed to parse ${this.absolutePath.path}: ${error}`);
        }
    }

    public set json(json: ReturnType<(typeof JSON)["parse"]>) {
        this.newContents = undefined === json ? json : File.serialize(json, this.tabSize);
    }

    public get exists() {
        return undefined !== this.originalContents;
    }

    public delete() {
        this.contents = undefined;
    }

    public makeExecutable() {
        this.executable = true;
    }

    public shouldBeExecutable() {
        return this.executable;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine the status
    //------------------------------------------------------------------------------------------------------------------

    public mustCreateOrOverwrite() {
        return undefined !== this.newContents && this.originalContents !== this.newContents;
    }

    public mustDelete() {
        return undefined !== this.originalContents && undefined === this.newContents;
    }

    public getSummaryOfChanges() {
        if (this.mustDelete()) {
            return [`Deleted ${this.absolutePath.path}`];
        } else if (!this.mustCreateOrOverwrite()) {
            return [];
        } else if (undefined === this.originalContents) {
            return [`Created ${this.absolutePath.path}`];
        } else {
            return [`Updated ${this.absolutePath.path}`];
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Serialize file contents into a string
    //------------------------------------------------------------------------------------------------------------------

    private static serialize(contents: string | ReadonlyArray<string> | object, tabSize: number) {
        if ("string" === typeof contents) {
            return this.normalize(contents);
        } else if (Array.isArray(contents)) {
            return this.normalize(contents.join("\n"));
        } else {
            return this.normalize(JSON.stringify(contents, undefined, tabSize));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Normalize file contents
    //------------------------------------------------------------------------------------------------------------------

    private static normalize(contents: string) {
        return contents.replace(/\r\n/g, "\n").replace(/\s+$/, "") + "\n";
    }
}
