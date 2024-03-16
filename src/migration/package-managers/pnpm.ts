import { LAUNCHPAD_PACKAGE_NAME } from "../../utilities/constants";
import { MigrationContext } from "../data/migration-context";
import { PackageManager } from "./package-manager";

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for pnpm
//----------------------------------------------------------------------------------------------------------------------

export class Pnpm extends PackageManager {
    public constructor() {
        super(
            {
                gitignorePatterns: {
                    current: ["/node_modules"],
                    deprecated: [],
                },
                swpmIdentifier: "pnpm",
                installCommand: ["pnpm", "install"],
                upgradeAllCommand: ["pnpm", "up", "--latest"],
                launchpadDlxCommand: ["pnpm", "dlx", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
                launchpadLocalCommand: ["pnpm", "exec", "launchpad"],
            },
            createOrUpdatePnpmConfiguration,
            removePnpmConfigurationAndArtifacts,
            getPnpmUpgradeCommand
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create pnpm-specific configuration files/settings
//----------------------------------------------------------------------------------------------------------------------

function createOrUpdatePnpmConfiguration(context: MigrationContext) {
    deleteIgnoredNodeModules(context);
}

//----------------------------------------------------------------------------------------------------------------------
// Remove pnpm-specific configuration, files and directories
//----------------------------------------------------------------------------------------------------------------------

function removePnpmConfigurationAndArtifacts(context: MigrationContext) {
    deleteIgnoredNodeModules(context);
    context.files.get(".npmrc").delete();
    context.files.get("pnpm-lock.yaml").delete();
}

//----------------------------------------------------------------------------------------------------------------------
// Remove node_modules/.ignored
//----------------------------------------------------------------------------------------------------------------------

function deleteIgnoredNodeModules(context: MigrationContext) {
    context.directories.get("node_modules/.ignored").delete();
}

//----------------------------------------------------------------------------------------------------------------------
// Get the pnpm-specific command to upgrade selected packages
//----------------------------------------------------------------------------------------------------------------------

function getPnpmUpgradeCommand(npmPackages: ReadonlyArray<string>) {
    return ["pnpm", "update", "--latest", ...npmPackages];
}
