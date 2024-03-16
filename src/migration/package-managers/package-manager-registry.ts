import { NewConfig, OldConfig } from "../../config/config-objects";
import { MigrationContext } from "../data/migration-context";
import { Npm } from "./npm";
import { PackageManager } from "./package-manager";
import { Pnpm } from "./pnpm";
import { Yarn } from "./yarn";

//----------------------------------------------------------------------------------------------------------------------
// Package managers
//----------------------------------------------------------------------------------------------------------------------

const PACKAGE_MANAGERS = {
    npm: new Npm(),
    pnpm: new Pnpm(),
    yarn: new Yarn(),
} as const satisfies Record<
    NewConfig["packageManager"]["value"] | OldConfig["packageManager"]["value"],
    PackageManager
>;

//----------------------------------------------------------------------------------------------------------------------
// Get one or more package managers
//----------------------------------------------------------------------------------------------------------------------

export function getAllPackageManagers() {
    return getPackageManagers(() => true);
}

export function getPackageManager(packageManagerOrContext: keyof typeof PACKAGE_MANAGERS | MigrationContext) {
    return PACKAGE_MANAGERS[
        "string" === typeof packageManagerOrContext
            ? packageManagerOrContext
            : packageManagerOrContext.newConfig.packageManager.value
    ];
}

export function getAllPackageManagersExcept(packageManager: keyof typeof PACKAGE_MANAGERS) {
    return getPackageManagers(currentPackageManager => currentPackageManager !== packageManager);
}

//----------------------------------------------------------------------------------------------------------------------
// Filter formatters
//----------------------------------------------------------------------------------------------------------------------

function getPackageManagers(filter: (key: keyof typeof PACKAGE_MANAGERS) => unknown) {
    const result = new Array<PackageManager>();
    for (const formatter of Object.keys(PACKAGE_MANAGERS) as (keyof typeof PACKAGE_MANAGERS)[]) {
        if (formatter in PACKAGE_MANAGERS && filter(formatter)) {
            result.push(PACKAGE_MANAGERS[formatter]);
        }
    }
    return result;
}
