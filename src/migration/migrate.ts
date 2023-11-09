import type { NewConfig, OldConfig, OldPartialConfig } from "../config/config-objects.js";
import { DEFAULT_PACKAGE_MANAGER } from "../config/default-config-values.js";
import { VERSION_NUMBER } from "../resources/version-information.js";
import { fail } from "../utilities/fail.js";
import type { Path } from "../utilities/path.js";
import { MigrationContext } from "./data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type MigrateOptions = Omit<ConstructorParameters<typeof MigrationContext>[0], "oldConfig" | "newConfig"> &
    (
        | { oldConfig: OldPartialConfig | undefined; newConfig: NewConfig }
        | { oldConfig: OldConfig; newConfig: undefined }
    );

//----------------------------------------------------------------------------------------------------------------------
// Perform the migration
//----------------------------------------------------------------------------------------------------------------------

export function migrate(options: MigrateOptions) {
    const skippedSteps = new Array<string>();
    const newConfig = options.newConfig ?? getNewConfig(options, options.oldConfig, skippedSteps);
    const context = new MigrationContext({ ...options, newConfig });
    console.log(context);
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate the target configuration
//----------------------------------------------------------------------------------------------------------------------

function getNewConfig(options: MigrateOptions, oldConfig: OldConfig, _skippedStep: string[]): NewConfig {
    const packageJson = inspectPackageJson(options.projectRoot);
    return {
        artifact: oldConfig.artifact,
        bundler: oldConfig.bundler,
        bundlerOutDir: oldConfig.bundlerOutDir,
        createDebugModule: false,
        createMakefile: false,
        createProjectTemplate: false,
        createVsCodeSettings: false,
        dependencies: [],
        dtsBundler: oldConfig.dtsBundler,
        formatter: oldConfig.formatter,
        installationMode: oldConfig.installationMode,
        installDevDependencies: packageJson.hasDevDependencies,
        module: oldConfig.module,
        packageManager: getPackageManager(oldConfig.packageManager, options.canRunPackageManagerCommands), // switch to default if possible
        projectName: oldConfig.projectName,
        runtime: oldConfig.runtime,
        srcDir: oldConfig.srcDir,
        tabSize: oldConfig.tabSize,
        tscOutDir: oldConfig.tscOutDir,
        version: VERSION_NUMBER,
        webAppDir: oldConfig.webAppDir,
    };
}

function inspectPackageJson(projectRoot: Path) {
    const path = projectRoot.child("package.json");
    try {
        const packageJson = path.existsAndIsFile() ? JSON.parse(path.loadFileContents()) : {};
        return {
            hasDevDependencies: !!(packageJson?.dependencies?.typescript || packageJson?.dependencies?.typescript),
        };
    } catch (error) {
        fail(`Failed to load ${path.path}: ${error}`);
    }
}

function getPackageManager(
    oldPackageManager: OldConfig["packageManager"],
    _canRunPackageManagerCommands: boolean
): NewConfig["packageManager"] {
    if (oldPackageManager.pinned || oldPackageManager.value === DEFAULT_PACKAGE_MANAGER.value) {
        return oldPackageManager;
    } else {
        return oldPackageManager;
    }
}
