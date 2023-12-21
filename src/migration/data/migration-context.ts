import type { NewConfig, OldPartialConfig } from "../../config/config-objects.js";
import type { Path } from "../../utilities/path.js";
import { GitignoreOperations } from "../files/gitignore.js";
import { PackageJsonOperations } from "../files/package-json.js";
import { VSCodeSettingsOperations } from "../files/vscode-settings.js";
import { Directory, File, FileOrDirectoryCache } from "./file-cache.js";
import { GITIGNORE, PACKAGE_JSON, VSCODE_SETTINGS_JSON } from "./known-files.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrationContextOptions = {
    projectRoot: Path;
    oldConfig: OldPartialConfig | undefined;
    newConfig: NewConfig;
};

//----------------------------------------------------------------------------------------------------------------------
// Context information that's passed around when initializing and uplifting
//----------------------------------------------------------------------------------------------------------------------

export class MigrationContext {
    public readonly projectRoot;
    public readonly oldConfig;
    public readonly newConfig;

    public readonly errors = new Array<string>();

    public readonly files;
    public readonly directories;
    public readonly fileOperations;

    public readonly mainModule;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(options: MigrationContextOptions) {
        this.projectRoot = options.projectRoot;
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
            gitignore: new GitignoreOperations(this.files.get(GITIGNORE)),
            packageJson: new PackageJsonOperations(this.files.get(PACKAGE_JSON)),
            vscodeSettings: new VSCodeSettingsOperations(this.files.get(VSCODE_SETTINGS_JSON)),
        };
        this.mainModule = `${options.newConfig.srcDir}/${options.newConfig.projectName}`;
    }
}
