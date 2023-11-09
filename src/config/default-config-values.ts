import { unpinned } from "./config-data-types.js";
import type { CommandLineConfig, NewConfig } from "./config-objects.js";

export const DEFAULT_ARTIFACT = "app" satisfies NewConfig["artifact"];
export const DEFAULT_BUILD_DIR = "build";
export const DEFAULT_BUNDLER = unpinned("esbuild") satisfies NewConfig["bundler"];
export const DEFAULT_CREATE_DEBUG_MODULE = false;
export const DEFAULT_CREATE_MAKEFILE = true;
export const DEFAULT_CREATE_PROJECT_TEMPLATE = true;
export const DEFAULT_CREATE_VSCODE_SETTINGS = true;
export const DEFAULT_DEPENDENCIES_CLI = ["@types/node"];
export const DEFAULT_DEPENDENCIES_WEB = [];
export const DEFAULT_DIST_DIR = "dist";
export const DEFAULT_DTS_BUNDLER = unpinned("dts-bundle-generator") satisfies NewConfig["dtsBundler"];
export const DEFAULT_FORMATTER = unpinned("prettier") satisfies NewConfig["formatter"];
export const DEFAULT_INSTALL_DEV_DEPENDENCIES = true;
export const DEFAULT_INSTALLATION_MODE = "local" satisfies NewConfig["installationMode"];
export const DEFAULT_MODULE_SYSTEM = "esm" satisfies NewConfig["module"];
export const DEFAULT_PACKAGE_MANAGER = unpinned("npm") satisfies NewConfig["packageManager"];
export const DEFAULT_RUNTIME = "cli" satisfies CommandLineConfig["runtimeCli"];
export const DEFAULT_SRC_DIR = "src" satisfies NewConfig["srcDir"];
export const DEFAULT_TAB_SIZE = 4 satisfies NewConfig["tabSize"];
