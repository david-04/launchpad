import { launchpad } from "./launchpad.js";

init();

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
        "--web-app-dir=dist",
        "--tsc-out-dir=dist",
    ]);
}
