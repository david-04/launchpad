import { fail } from "../../utilities/fail.js";
import type { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a single file that can be created/modified/deleted
//----------------------------------------------------------------------------------------------------------------------

export class File {
    public readonly type = "file";
    public readonly absolutePath: Path;
    public readonly originalContents: string | undefined;
    private newContents: string | undefined;
    private readonly logMessages = {
        added: new Array<string>(),
        updated: new Array<string>(),
        removed: new Array<string>(),
    } as const;

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
        try {
            return undefined === this.newContents ? undefined : JSON.parse(this.newContents.replace(/(\n\s)+$/, ""));
        } catch (error) {
            fail(`Failed to parse ${this.absolutePath.path}: ${error}`);
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

    //------------------------------------------------------------------------------------------------------------------
    // Deposit log messages
    //------------------------------------------------------------------------------------------------------------------

    public logAdded(...items: string[]) {
        this.logMessages.added.push(...items);
    }

    public logUpdated(...items: string[]) {
        this.logMessages.updated.push(...items);
    }

    public logRemoved(...items: string[]) {
        this.logMessages.removed.push(...items);
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
