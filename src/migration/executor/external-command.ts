import { Path } from "../../utilities/path.js";

//----------------------------------------------------------------------------------------------------------------------
// An externally run command
//----------------------------------------------------------------------------------------------------------------------

export class ExternalCommand {
    public readonly workingDirectory;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly description: string,
        workingDirectory: Path,
        public readonly argv: ReadonlyArray<string>
    ) {
        this.workingDirectory = workingDirectory.path;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Execute the command
    //------------------------------------------------------------------------------------------------------------------

    public execute() {
        console.log(this.workingDirectory);
    }
}
