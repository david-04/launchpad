import { fail } from "../../utilities/fail";
import type { Path } from "../../utilities/path";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a directory
//----------------------------------------------------------------------------------------------------------------------

export class Directory {
    public readonly type = "directory";
    public readonly absolutePath: Path;
    public readonly exists: boolean;
    private shouldExist: boolean;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        projectRoot: Path,
        public readonly relativePath: string
    ) {
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

    public getSummaryOfChanges() {
        if (this.mustDelete()) {
            return [`Deleted ${this.absolutePath.path}`];
        } else if (this.mustCreate()) {
            return [`Created ${this.absolutePath.path}`];
        } else {
            return [];
        }
    }
}
