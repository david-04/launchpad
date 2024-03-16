import { LAUNCHPAD_PACKAGE_NAME } from "../../utilities/constants";
import { MigrationContext } from "../data/migration-context";
import { PackageManager } from "./package-manager";

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for yarn
//----------------------------------------------------------------------------------------------------------------------

export class Yarn extends PackageManager {
    public constructor() {
        super(
            {
                gitignorePatterns: {
                    current: [
                        "/node_modules",
                        "/.pnp.*",
                        "/.yarn/*",
                        "!/.yarn/patches",
                        "!/.yarn/plugins",
                        "!/.yarn/releases",
                        "!/.yarn/sdks",
                        "!/.yarn/versions",
                    ],
                    deprecated: [],
                },
                swpmIdentifier: "yarn@berry",
                installCommand: ["yarn", "install"],
                upgradeAllCommand: ["yarn", "up", "*@latest"],
                launchpadDlxCommand: ["yarn", "dlx", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
                launchpadLocalCommand: ["yarn", "run", "--binaries-only", "launchpad"],
            },
            createOrUpdateYarnConfiguration,
            removeYarnConfigurationAndArtifacts,
            getYarnUpgradeCommand
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create yarn-specific configuration files/settings
//----------------------------------------------------------------------------------------------------------------------

function createOrUpdateYarnConfiguration(context: MigrationContext) {
    disablePlugAndPlay(context);
    installOrUpgradeYarn(context);
}

function disablePlugAndPlay(context: MigrationContext) {
    const yarnrc = context.files.get(".yarnrc.yml");
    yarnrc.contents = yarnrc.contents ?? "nodeLinker: node-modules";
}

function installOrUpgradeYarn(context: MigrationContext) {
    const hasChanged = context.oldConfig?.packageManager?.value !== context.newConfig.packageManager.value;
    const message = hasChanged ? "Installing yarn" : "Upgrading yarn to the latest version";
    context.addExternalCommand(message, ["yarn", "set", "version", "stable"]);
}

//----------------------------------------------------------------------------------------------------------------------
// Remove yarn-specific configuration, files and directories
//----------------------------------------------------------------------------------------------------------------------

function removeYarnConfigurationAndArtifacts(context: MigrationContext) {
    context.directories.get(".yarn").delete();
    context.files.get(".yarnrc.yml").delete();
    context.files.get("yarn.lock").delete();
    const { packageJson } = context.fileOperations;
    if (packageJson.json.packageManager?.match(/^yarn@.*/)) {
        packageJson.deleteProperty("packageManager");
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get the yarn-specific command to upgrade selected packages
//----------------------------------------------------------------------------------------------------------------------

function getYarnUpgradeCommand(npmPackages: ReadonlyArray<string>) {
    return ["yarn", "up", ...npmPackages];
}
