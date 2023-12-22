import type { File } from "../data/file.js";

//----------------------------------------------------------------------------------------------------------------------
// Default formatters
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
// Type definitions
//----------------------------------------------------------------------------------------------------------------------

const VSCODE_LANGUAGE_IDS = [
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
    [index: string]: VSCodeSettingsValue | VSCodeSettingsObject | VSCodeSettingsArray;
};
export type VSCodeSettingsArray = Array<VSCodeSettingsValue | VSCodeSettingsObject | VSCodeSettingsArray>;

export type VSCodeSettingsLanguage = VSCodeSettingsObject & {
    readonly "editor.defaultFormatter"?: string;
};

export type VSCodeSettings = VSCodeSettingsObject & Readonly<Record<`[${VsCodeLanguageId}]`, VSCodeSettingsLanguage>>;

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
    // Formatter
    //------------------------------------------------------------------------------------------------------------------

    public setFormatters(formatters: Partial<Record<VsCodeLanguageId, string>>) {
        for (const languageId of VSCODE_LANGUAGE_IDS) {
            const formatter = formatters[languageId];
            formatter ? this.setFormatter(languageId, formatter) : this.removeFormatter(languageId);
        }
    }

    private setFormatter(language: VsCodeLanguageId, formatter: string) {
        this.json = {
            ...this.json,
            [`[${language}]`]: {
                ...this.json[`[${language}]`],
                "editor.defaultFormatter": formatter,
            },
        };
    }

    private removeFormatter(language: VsCodeLanguageId) {
        if (this.json[`[${language}]`]) {
            const languageSettings = { ...this.json[`[${language}]`] };
            delete languageSettings["editor.defaultFormatter"];
            this.json = { ...this.json, [`[${language}]`]: languageSettings };
        }
    }
}
