import { launchpad } from "./launchpad.js";

init();

export function postinstall() {
    launchpad(["postinstall"]);
}

export function init() {
    launchpad([
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
        "--installation-mode=global-no-update",
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
}
