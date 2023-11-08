import { launchpad } from "./launchpad.js";

addCommand("help", "--help");
addCommand("postinstall", "postinstall");
addCommand("uplift", "postinstall");

addCommand("init", [
    "init",
    "--project-name=test",
    "--artifact=app",
    "--runtime=cli",
    "--module-system=esm",
    "--bundler=disabled",
    "--dts-bundler=disabled",
    "--formatter=prettier",
    "--package-manager=npm",
    "--src-dir=src",
    "--tab-size=4",
    "--installation-mode=global",
    "--create-project-files=true",
    "--create-debug-module=true",
    "--web-app-dir=dist",
    "--tsc-out-dir=dist",
    "--bundler-out-dir=dist/js",
    "--auto-selected-dependencies=",
    "--preselected-dependencies=",
    "--optional-dependencies=",
    "--install-dev-dependencies=false",
]);

function addCommand(argument: string, launchpadOptions: string | ReadonlyArray<string>) {
    if (process.argv[2] === argument) {
        launchpad("string" === typeof launchpadOptions ? [launchpadOptions] : launchpadOptions);
        process.exit(0);
    }
}

console.error(`Unknown command: ${process.argv.slice(2).join(" ")}`);
process.exit(1);
