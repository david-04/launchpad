import { execFileSync } from "child_process";
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
        const [cmd, ...args] = this.argv;
        execFileSync(cmd ?? "", args, { cwd: this.workingDirectory, stdio: "inherit" });
    }
}
