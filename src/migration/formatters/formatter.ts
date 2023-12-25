import { MigrationContext } from "migration/data/migration-context";
import { VSCODE_LANGUAGE_IDS, VsCodeLanguageId } from "migration/files/vscode-settings";

//----------------------------------------------------------------------------------------------------------------------
// Base class for all formatters
//----------------------------------------------------------------------------------------------------------------------

export class Formatter {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    protected constructor(
        private readonly supportedLanguageIds: ReadonlyArray<VsCodeLanguageId>,
        private readonly vsCodeFormatterId: string,
        public readonly createOrUpdateConfigurationExcludingVsCode: (context: MigrationContext) => void,
        public readonly removeConfigurationExcludingVsCode: (context: MigrationContext) => void
    ) {}

    //------------------------------------------------------------------------------------------------------------------
    // Update .vscode/settings.json
    //------------------------------------------------------------------------------------------------------------------

    public applyToVsCodeSettings(context: MigrationContext) {
        const { vscodeSettings } = context.fileOperations;
        for (const languageId of VSCODE_LANGUAGE_IDS) {
            const formatter = this.supportedLanguageIds.includes(languageId) ? this.vsCodeFormatterId : undefined;
            if (formatter) {
                vscodeSettings.setFormatter(languageId, formatter);
            } else {
                vscodeSettings.removeFormatter(languageId);
            }
            vscodeSettings.enableFormatOnSaveIfNotSet(languageId);
        }
    }
}
