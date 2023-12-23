import type { NewConfig, OldPartialConfig } from "../../config/config-objects";
import type { Path } from "../../utilities/path";
import { ExternalCommand } from "../executor/external-command";
import { GitignoreOperations } from "../files/gitignore";
import { PackageJsonOperations } from "../files/package-json";
import { VSCodeSettingsOperations } from "../files/vscode-settings";
import { Directory } from "./directory";
import { File } from "./file";
import { FileOrDirectoryCache } from "./file-or-directory-cache";
import { GITIGNORE, PACKAGE_JSON, VSCODE_SETTINGS_JSON } from "./known-files";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrationContextOptions = {
    operation: "initialize" | "uplift";
    projectRoot: Path;
    oldConfig: OldPartialConfig | undefined;
    newConfig: NewConfig;
};

//----------------------------------------------------------------------------------------------------------------------
// Context information that's passed around when initializing and uplifting
//----------------------------------------------------------------------------------------------------------------------

export class MigrationContext {
    public readonly operation;
    public readonly mainModulePath;
    public readonly debugModulePath;
    public readonly projectRoot;
    public readonly oldConfig;
    public readonly newConfig;
    public readonly fileOperations;
    public readonly startedAt = new Date();

    public readonly files;
    public readonly directories;
    public readonly externalCommands = new Array<ExternalCommand>();

    public manualActionRequired?: "rollback" | "complete";
    public manualFileSystemInstructions = new Array<string>();
    public manualCommandInstructions = new Array<string>();
    public activityLog = new Array<string>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(options: MigrationContextOptions) {
        this.operation = options.operation;
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
        this.mainModulePath = `${options.newConfig.srcDir}/${options.newConfig.projectName}.ts`;
        this.debugModulePath = `${options.newConfig.srcDir}/debug.ts`;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add an external command
    //------------------------------------------------------------------------------------------------------------------

    public addExternalCommand(description: string, command: ReadonlyArray<string>) {
        this.externalCommands.push(new ExternalCommand(description, this.projectRoot, command));
    }
}
