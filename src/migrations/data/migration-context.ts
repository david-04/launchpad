import type { Path } from "../../utilities/path.js";
import { PendingChanges } from "./pending-changes.js";

//----------------------------------------------------------------------------------------------------------------------
// Context information that's passed around when initializing and uplifting
//----------------------------------------------------------------------------------------------------------------------

export class MigrationContext {
    public readonly skippedSteps = new Array<string>();
    public readonly pendingChanges;
    public readonly errors = new Array<string>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly projectRoot: Path,
        public readonly canRunPackageManagerCommands: boolean,
        public readonly canPromptUser: boolean,
        tabSize: number
    ) {
        this.pendingChanges = new PendingChanges(projectRoot, tabSize);
    }
}
