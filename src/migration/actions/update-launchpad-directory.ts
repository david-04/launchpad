import { serializeConfig } from "../../config/config-serializer.js";
import { ASSETS } from "../../resources/embedded-assets.js";
import { TSCONFIG_JSON_TEMPLATES } from "../../resources/embedded-tsconfig.js";
import {
    LAUNCHPAD_MAKEFILE_DOCUMENTATION,
    LAUNCHPAD_MAKEFILE_FOOTER,
    LAUNCHPAD_MAKEFILE_HEADER,
    LAUNCHPAD_SETTINGS_CFG,
    LAUNCHPAD_TSCONFIG_DEFAULT_JSON,
} from "../data/known-files.js";
import type { MigrationContext } from "../data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// Update ./launchpad/*
//----------------------------------------------------------------------------------------------------------------------

export function updateLaunchpadDirectory(context: MigrationContext) {
    updateLaunchpadMakefiles(context);
    updateLaunchpadSettings(context);
    updateLaunchpadTsConfigTemplate(context);
}

//----------------------------------------------------------------------------------------------------------------------
// Update .launchpad/Makefile
//----------------------------------------------------------------------------------------------------------------------

function updateLaunchpadMakefiles(context: MigrationContext) {
    const files = [LAUNCHPAD_MAKEFILE_DOCUMENTATION, LAUNCHPAD_MAKEFILE_HEADER, LAUNCHPAD_MAKEFILE_FOOTER] as const;
    files.forEach(makefile => (context.files.get(makefile).contents = ASSETS[makefile]));
}

//----------------------------------------------------------------------------------------------------------------------
// Update .launchpad/settings.cfg
//----------------------------------------------------------------------------------------------------------------------

function updateLaunchpadSettings(context: MigrationContext) {
    context.files.get(LAUNCHPAD_SETTINGS_CFG).contents = serializeConfig(context.newConfig);
}

//----------------------------------------------------------------------------------------------------------------------
// Update .launchpad/tsconfig.default.json
//----------------------------------------------------------------------------------------------------------------------

function updateLaunchpadTsConfigTemplate(context: MigrationContext) {
    const { artifact, module, runtime } = context.newConfig;
    const file = `tsconfig.${"node" === runtime.value ? "cli" : runtime.value}-${artifact}-${module}.json` as const;
    const tsconfig = TSCONFIG_JSON_TEMPLATES[file];
    const stringified = JSON.stringify(tsconfig, undefined, context.newConfig.tabSize)
        .replaceAll("__SRC_DIR__", normalizeDirectory(context.newConfig.srcDir))
        .replaceAll("__OUT_DIR__", normalizeDirectory(context.newConfig.tscOutDir));
    context.files.get(LAUNCHPAD_TSCONFIG_DEFAULT_JSON).contents = `${stringified}\n`;
}

function normalizeDirectory(directory: string) {
    return `../${JSON.stringify(directory).replace(/^"/, "").replace(/"$/, "")}`;
}
