import type { NewConfig, OldPartialConfig } from "../../config/config-objects.js";
import type { Path } from "../../utilities/path.js";
import { GitignoreOperations } from "../files/gitignore.js";
import { PackageJsonOperations } from "../files/package-json.js";
import { Directory, File, FileOrDirectoryCache } from "./file-cache.js";
import { GITIGNORE, PACKAGE_JSON } from "./known-files.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrationContextOptions = {
    projectRoot: Path;
    canRunPackageManagerCommands: boolean;
    oldConfig: OldPartialConfig | undefined;
    newConfig: NewConfig;
    skippedSteps: ReadonlyArray<string>;
};

//----------------------------------------------------------------------------------------------------------------------
// Context information that's passed around when initializing and uplifting
//----------------------------------------------------------------------------------------------------------------------

export class MigrationContext {
    public readonly projectRoot;
    public readonly canRunPackageManagerCommands;
    public readonly oldConfig;
    public readonly newConfig;

    public readonly skippedSteps = new Array<string>();
    public readonly errors = new Array<string>();

    public readonly preCommands = new Array<string>();
    public readonly files;
    public readonly directories;
    public readonly postCommands = new Array<string>();
    public readonly fileOperations;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(options: MigrationContextOptions) {
        this.projectRoot = options.projectRoot;
        this.canRunPackageManagerCommands = options.canRunPackageManagerCommands;
        this.oldConfig = options.oldConfig;
        this.newConfig = options.newConfig;
        this.files = new FileOrDirectoryCache(
            options.projectRoot,
            options.newConfig.tabSize,
            (root, path, tabSize) => new File(root, path, tabSize)
        );
        this.directories = new FileOrDirectoryCache(
            options.projectRoot,
            options.newConfig.tabSize,
            (root, path) => new Directory(root, path)
        );
        this.fileOperations = {
            packageJson: new PackageJsonOperations(this.files.get(PACKAGE_JSON)),
            gitignore: new GitignoreOperations(this.files.get(GITIGNORE)),
        };
        this.skippedSteps.push(...options.skippedSteps);
    }
}
