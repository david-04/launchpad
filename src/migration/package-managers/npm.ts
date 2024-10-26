import { LAUNCHPAD_PACKAGE_NAME } from "../../utilities/constants";
import { MigrationContext } from "../data/migration-context";
import { PackageManager } from "./package-manager";

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for npm
//----------------------------------------------------------------------------------------------------------------------

export class Npm extends PackageManager {
    public constructor() {
        super(
            {
                gitignorePatterns: {
                    current: ["/node_modules"],
                    deprecated: [],
                },
                swpmIdentifier: "npm",
                installCommand: ["npm", "install"],
                upgradeAllCommand: undefined,
                launchpadDlxCommand: ["npm", "exec", "--", `${LAUNCHPAD_PACKAGE_NAME}@latest`],
                launchpadLocalCommand: ["npm", "exec", "--no", "--", `${LAUNCHPAD_PACKAGE_NAME}`],
            },
            () => {},
            removeNpmConfigurationAndArtifacts,
            getNpmUpgradeCommand
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Remove npm-specific configuration, files and directories
//----------------------------------------------------------------------------------------------------------------------

function removeNpmConfigurationAndArtifacts(context: MigrationContext) {
    context.files.get(".npmrc").delete();
    context.files.get("package-lock.json").delete();
}

//----------------------------------------------------------------------------------------------------------------------
// Get the npm-specific command to upgrade selected packages
//----------------------------------------------------------------------------------------------------------------------

function getNpmUpgradeCommand(npmPackages: ReadonlyArray<string>) {
    return ["npm", "install", ...npmPackages.map(npmPackage => `${npmPackage}@latest`)];
}
