//----------------------------------------------------------------------------------------------------------------------
// General metadata
//----------------------------------------------------------------------------------------------------------------------

import { MigrationContext } from "migration/data/migration-context";
import { PackageJson } from "migration/files/package-json";

export type PackageManagerDescriptor = {
    readonly gitignorePatterns: Readonly<Record<"current" | "deprecated", ReadonlyArray<string>>>;
    readonly swpmIdentifier: PackageJson["swpm"] | undefined;
    readonly installCommand: ReadonlyArray<string>;
    readonly upgradeAllCommand: ReadonlyArray<string> | undefined;
};

//----------------------------------------------------------------------------------------------------------------------
// Base class for all package managers
//----------------------------------------------------------------------------------------------------------------------

export class PackageManager {
    public readonly gitignorePatterns;
    public readonly swpmIdentifier;
    public readonly installCommand;
    public readonly upgradeAllPackagesCommand;

    public constructor(
        descriptor: PackageManagerDescriptor,
        public readonly createOrUpdateConfiguration: (context: MigrationContext) => void,
        public readonly removeConfigurationAndArtifacts: (context: MigrationContext) => void,
        public readonly getUpgradePackagesCommand: (npmPackages: ReadonlyArray<string>) => ReadonlyArray<string>
    ) {
        this.gitignorePatterns = descriptor.gitignorePatterns;
        this.swpmIdentifier = descriptor.swpmIdentifier;
        this.installCommand = descriptor.installCommand;
        this.upgradeAllPackagesCommand = descriptor.upgradeAllCommand;
    }
}
