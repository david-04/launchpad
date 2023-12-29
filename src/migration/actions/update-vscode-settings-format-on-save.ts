import { MigrationContext } from "migration/data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Set format-on-save if it's not set already
//----------------------------------------------------------------------------------------------------------------------

export function updateVsCodeSettingsFormatOnSave(context: MigrationContext) {
    if (context.newConfig.vsCodeSettings.has("format-on-save")) {
        const vscodeSettings = context.fileOperations.vscodeSettings;
        const formatOnSave = vscodeSettings.json["editor.formatOnSave"] ?? true;
        vscodeSettings.json = { ...vscodeSettings.json, "editor.formatOnSave": formatOnSave };
    }
}
