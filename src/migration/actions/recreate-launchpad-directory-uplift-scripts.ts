import { LAUNCHPAD_PACKAGE_NAME } from "../../utilities/constants";
import { LAUNCHPAD_UPLIFT, LAUNCHPAD_UPLIFT_BAT } from "../data/known-files";
import { MigrationContext } from "../data/migration-context";
import { getPackageManager } from "../package-managers/package-manager-registry";

const UPLIFT_PARAMETERS = "__UPLIFT_PARAMETERS__";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/uplift*
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryUpliftScripts(context: MigrationContext) {
    const upgradeLaunchpadCommand = serializeCommand(getUpgradeLaunchpadCommand(context));
    const upliftCommand = serializeCommand([...getUpliftCommand(context), UPLIFT_PARAMETERS]);
    const commands = [upgradeLaunchpadCommand, upliftCommand].filter(command => command.trim());
    recreateUpliftShellScript(context, commands);
    recreateUpliftBatchScript(context, commands);
}

//----------------------------------------------------------------------------------------------------------------------
// Recreate launchpad/uplift
//----------------------------------------------------------------------------------------------------------------------

function recreateUpliftShellScript(context: MigrationContext, commands: ReadonlyArray<string>) {
    const file = context.files.get(LAUNCHPAD_UPLIFT);
    file.lines = [
        "#!/usr/bin/env bash",
        "",
        'if [[ -d "../.launchpad" ]]; then',
        "    cd ..",
        "fi",
        "",
        'if [[ ! -d "./.launchpad" ]]; then',
        '    echo "⛔ ERROR: .launchpad/uplift must be run from the project root directory" >&2',
        "    exit 1",
        "fi",
        "",
        'echo "Uplifting the project..."',
        'echo ""',
        "",
        `if ! ${commands.map(command => command.replaceAll(UPLIFT_PARAMETERS, 'uplift "$@"')).join(" && ")}; then`,
        '    echo "" >&2',
        '    echo "⛔ ERROR: The uplift has failed" >&2',
        "    exit 1",
        "fi",
    ];
    file.makeExecutable();
}

//----------------------------------------------------------------------------------------------------------------------
// Recreate launchpad/uplift.bat
//----------------------------------------------------------------------------------------------------------------------

function recreateUpliftBatchScript(context: MigrationContext, commands: ReadonlyArray<string>) {
    context.files.get(LAUNCHPAD_UPLIFT_BAT).lines = [
        "@echo off",
        "",
        'cd /D "%~dp0\\.."',
        "",
        'if not exist ".launchpad" (',
        "    echo ERROR: .launchpad/uplift.bat must be run from the project root directory",
        "    exit /b 1",
        ")",
        "",
        "echo Uplifting the project...",
        "echo .",
        ...commands.flatMap(toBatchCommandWithErrorHandler),
    ];
}

//----------------------------------------------------------------------------------------------------------------------
// Get the command to upgrade the launchpad npm package itself
//----------------------------------------------------------------------------------------------------------------------

function getUpgradeLaunchpadCommand(context: MigrationContext) {
    return "local" === context.newConfig.installationMode
        ? getPackageManager(context).getUpgradePackagesCommand([LAUNCHPAD_PACKAGE_NAME])
        : [];
}

//----------------------------------------------------------------------------------------------------------------------
// Get the command to uplift the project
//----------------------------------------------------------------------------------------------------------------------

function getUpliftCommand(context: MigrationContext) {
    if ("local" === context.newConfig.installationMode) {
        return getPackageManager(context).launchpadLocalCommand;
    } else if ("global" === context.newConfig.installationMode) {
        return ["launchpad"] as const;
    } else {
        const packageManager = (
            {
                temp: getPackageManager(context),
                npx: getPackageManager("npm"),
                "pnpm-dlx": getPackageManager("pnpm"),
                "yarn-dlx": getPackageManager("yarn"),
            } as const
        )[context.newConfig.installationMode];
        return packageManager.launchpadDlxCommand;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Serialize a command into a (somewhat) script-compatible string
//----------------------------------------------------------------------------------------------------------------------

function serializeCommand(command: ReadonlyArray<string>) {
    return command.map(element => (/.*(\s|").*/.exec(element) ? JSON.stringify(element) : element)).join(" ");
}

//----------------------------------------------------------------------------------------------------------------------
// Attach an ERRORLEVEL to the given batch command
//----------------------------------------------------------------------------------------------------------------------

function toBatchCommandWithErrorHandler(command: string) {
    return !command
        ? []
        : [
              "",
              command.replaceAll(UPLIFT_PARAMETERS, "uplift %*"),
              'if not "%ERRORLEVEL%" == "0" (',
              "    echo.",
              "    echo ERROR: The uplift has failed",
              "    exit /b 1",
              ")",
          ];
}
