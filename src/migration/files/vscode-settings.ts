import type { File } from "../data/file";

//----------------------------------------------------------------------------------------------------------------------
// Type definitions
//----------------------------------------------------------------------------------------------------------------------

export const VSCODE_LANGUAGE_IDS = [
    "css",
    "html",
    "json",
    "jsonc",
    "javascript",
    "javascriptreact",
    "less",
    "scss",
    "typescript",
    "typescriptreact",
] as const;

export type VsCodeLanguageId = (typeof VSCODE_LANGUAGE_IDS)[number];

export type VSCodeSettingsValue = string | number | boolean;
export type VSCodeSettingsObject = {
    [index: string]: VSCodeSettingsValue | VSCodeSettingsObject | VSCodeSettingsArray | null;
};
export type VSCodeSettingsArray = Array<VSCodeSettingsValue | VSCodeSettingsObject | VSCodeSettingsArray>;

export type VSCodeSettingsLanguage = VSCodeSettingsObject & {
    readonly "editor.defaultFormatter"?: string;
};

export type VSCodeSettings = VSCodeSettingsObject &
    Readonly<Record<`[${VsCodeLanguageId}]`, VSCodeSettingsLanguage>> & {
        "editor.formatOnSave"?: boolean;
    };

const DEFAULT_FORMATTER = "editor.defaultFormatter";

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for the package.json file
//----------------------------------------------------------------------------------------------------------------------

export class VSCodeSettingsOperations {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly file: File) {}

    //------------------------------------------------------------------------------------------------------------------
    // Get and set the whole JSON
    //------------------------------------------------------------------------------------------------------------------

    public get json(): VSCodeSettings {
        return this.file.json ?? {};
    }

    public set json(json: VSCodeSettings) {
        this.file.json = json;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get, set or remove the formatter
    //------------------------------------------------------------------------------------------------------------------

    public setFormatter(languageId: VsCodeLanguageId, formatter: string) {
        const key = VSCodeSettingsOperations.languageIdToJsonKey(languageId);
        this.json = { ...this.json, [key]: { ...this.json[key], [DEFAULT_FORMATTER]: formatter } };
    }

    public removeFormatter(languageId: VsCodeLanguageId) {
        const key = VSCodeSettingsOperations.languageIdToJsonKey(languageId);
        if (this.json[key]) {
            const languageSettings = { ...this.json[key] };
            delete languageSettings[DEFAULT_FORMATTER];
            this.json = { ...this.json, [key]: languageSettings };
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert a language ID to the respective VSCode settings key
    //------------------------------------------------------------------------------------------------------------------

    private static languageIdToJsonKey(languageId: VsCodeLanguageId) {
        return `[${languageId}]` as const;
    }
}
