import type { NewConfig } from "../../config/config-objects.js";
import type { MigrationContext } from "../data/migration-context.js";
import { VSCodeSettingsOperations, type VsCodeLanguageId } from "../files/vscode-settings.js";

//----------------------------------------------------------------------------------------------------------------------
// Update the VSCode settings
//----------------------------------------------------------------------------------------------------------------------

export function updateVsCodeSettings(context: MigrationContext) {
    const vscodeSettings = context.fileOperations.vscodeSettings;
    updateVscodeSettingsFormatter(context, vscodeSettings);
}

//----------------------------------------------------------------------------------------------------------------------
// Formatter
//----------------------------------------------------------------------------------------------------------------------

function updateVscodeSettingsFormatter(context: MigrationContext, vscodeSettings: VSCodeSettingsOperations) {
    if (mustUpdateVsCodeFormatterSettings(context, vscodeSettings)) {
        const before = vscodeSettings.file.contents;
        vscodeSettings.setFormatters(getVscodeSettingsCodeFormatter(context));
        if (before !== vscodeSettings.file.contents) {
            if (!vscodeSettings.file.exists) {
                vscodeSettings.file.logAdded("code formatter settings");
            } else {
                vscodeSettings.file.logUpdated("code formatter settings");
            }
        }
    }
}

function mustUpdateVsCodeFormatterSettings(context: MigrationContext, vscodeSettings: VSCodeSettingsOperations) {
    if (!vscodeSettings.file.exists && "disabled" !== context.newConfig.formatter.value) {
        return true;
    } else {
        return context.oldConfig?.formatter?.value !== context.newConfig.formatter.value;
    }
}

function getVscodeSettingsCodeFormatter(context: MigrationContext) {
    const settings: Record<NewConfig["formatter"]["value"], Partial<Record<VsCodeLanguageId, string>>> = {
        disabled: {},
        prettier: {
            html: "esbenp.prettier-vscode",
            json: "esbenp.prettier-vscode",
            jsonc: "esbenp.prettier-vscode",
            javascript: "esbenp.prettier-vscode",
            javascriptreact: "esbenp.prettier-vscode",
            less: "esbenp.prettier-vscode",
            scss: "esbenp.prettier-vscode",
            typescript: "esbenp.prettier-vscode",
            typescriptreact: "esbenp.prettier-vscode",
        },
    };
    return settings[context.newConfig.formatter.value];
}
