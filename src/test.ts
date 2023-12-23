import { launchpad } from "./launchpad";

async function main() {
    await addCommand("help", "--help");
    await addCommand("postinstall", "postinstall");
    await addCommand("uplift", "uplift");

    await addCommand("init", [
        "init",
        "--artifact=app",
        "--auto-selected-dependencies=",
        "--bundler-out-dir=dist/js",
        "--bundler=disabled",
        "--create-debug-module=true",
        "--create-project-template=true",
        "--dts-bundler=disabled",
        "--formatter=prettier",
        "--install-dev-dependencies=false",
        "--installation-mode=global",
        "--module-system=esm",
        "--optional-dependencies=",
        "--package-manager=npm",
        "--preselected-dependencies=",
        "--project-name=test",
        "--runtime=cli",
        "--src-dir=src",
        "--tab-size=4",
        "--tsc-out-dir=dist",
        "--web-app-dir=dist",
    ]);
}

async function addCommand(argument: string, launchpadOptions: string | ReadonlyArray<string>) {
    if (process.argv[2] === argument) {
        await launchpad("string" === typeof launchpadOptions ? [launchpadOptions] : launchpadOptions);
        process.exit(0);
    }
}

main()
    .then(() => {
        console.error(`Unknown command: ${process.argv.slice(2).join(" ")}`);
        process.exit(1);
    })
    .catch(error => {
        console.error(error);
    });
