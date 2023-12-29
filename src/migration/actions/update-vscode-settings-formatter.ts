import { MigrationContext } from "migration/data/migration-context";
import { VSCODE_LANGUAGE_IDS } from "migration/files/vscode-settings";
import { getFormatter } from "migration/formatters/formatter-registry";

//----------------------------------------------------------------------------------------------------------------------
// Update the VSCode settings
//----------------------------------------------------------------------------------------------------------------------

export function updateVsCodeSettingsFormatter(context: MigrationContext) {
    if (context.newConfig.vsCodeSettings.has("formatter")) {
        const vscodeSettings = context.fileOperations.vscodeSettings;
        const formatter = getFormatter(context);
        for (const languageId of VSCODE_LANGUAGE_IDS) {
            formatter.supportedLanguageIds.includes(languageId)
                ? vscodeSettings.setFormatter(languageId, formatter.vsCodeFormatterId)
                : vscodeSettings.removeFormatter(languageId);
        }
    }
}
