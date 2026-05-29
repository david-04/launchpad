import { ASSETS } from "../../resources/embedded-assets.generated";
import { OXFMT_CONFIG_MJS } from "../data/known-files";
import { MigrationContext } from "../data/migration-context";
import { Formatter } from "./formatter";

//----------------------------------------------------------------------------------------------------------------------
// Oxfmt code formatter
//----------------------------------------------------------------------------------------------------------------------

export class Oxfmt extends Formatter {
    public constructor() {
        super(
            [
                "css",
                "graphql",
                "html",
                "javascript",
                "javascriptreact",
                "json",
                "jsonc",
                "less",
                "markdown",
                "scss",
                "toml",
                "typescript",
                "typescriptreact",
                "yaml",
            ],
            "oxc.oxc-vscode",
            updateConfigurationExcludingVsCode,
            removeConfigurationExcludingVscode
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update the oxfmt formatting options
//----------------------------------------------------------------------------------------------------------------------

function updateConfigurationExcludingVsCode(context: MigrationContext) {
    const file = context.files.get(OXFMT_CONFIG_MJS);
    if (!file.exists) {
        file.contents = ASSETS[OXFMT_CONFIG_MJS];
    }
    if (context.newConfig.vsCodeSettings.has("formatter")) {
        context.fileOperations.vscodeSettings.json = {
            ...context.fileOperations.vscodeSettings.json,
            "oxc.fmt.configPath": "oxfmt.config.mjs",
        };
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Remove oxfmt configuration
//----------------------------------------------------------------------------------------------------------------------

function removeConfigurationExcludingVscode(context: MigrationContext) {
    context.files.get(OXFMT_CONFIG_MJS).delete();
    if (context.newConfig.vsCodeSettings.has("formatter")) {
        const vscodeSettings = context.fileOperations.vscodeSettings.json;
        delete vscodeSettings["oxc.fmt.configPath"];
        context.fileOperations.vscodeSettings.json = vscodeSettings;
    }
}
