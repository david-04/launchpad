import type { NewConfig } from "../../config/config-objects.js";
import type { File } from "../data/file-cache.js";

//----------------------------------------------------------------------------------------------------------------------
// Type definitions
//----------------------------------------------------------------------------------------------------------------------

type PackageJsonValue = string | number | boolean;
type PackageJsonObject = { [index: string]: PackageJsonValue | PackageJsonObject | PackageJsonArray };
type PackageJsonArray = Array<PackageJsonValue | PackageJsonObject | PackageJsonArray>;

type PackageJson = PackageJsonObject & {
    dependencies?: { [index: string]: string };
    devDependencies?: { [index: string]: string };
    name?: string;
    prettier?: {
        arrowParens?: "avoid" | "always";
        bracketSameLine?: boolean;
        bracketSpacing?: boolean;
        embeddedLanguageFormatting?: "off" | "auto";
        endOfLine?: "lf" | "crlf" | "cr" | "auto";
        htmlWhitespaceSensitivity?: "css" | "strict" | "ignore";
        jsxSingleQuote?: boolean;
        printWidth?: number;
        proseWrap?: "always" | "never" | "preserve";
        quoteProps?: "as-needed" | "consistent" | "preserve";
        semi?: boolean;
        singleAttributePerLine?: boolean;
        singleQuote?: boolean;
        tabWidth?: number;
        trailingComma?: "all" | "es5" | "none";
        useTabs?: boolean;
    };
    private?: boolean;
    scripts?: { [index: string]: string };
    type?: "module" | "commonjs";
    version?: string;
};

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for the package.json file
//----------------------------------------------------------------------------------------------------------------------

export class PackageJsonOperations {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(private readonly file: File) {}

    //------------------------------------------------------------------------------------------------------------------
    // Create the file if it does not exist
    //------------------------------------------------------------------------------------------------------------------

    public createIfNotExists(config: NewConfig) {
        if (!this.file.json) {
            this.file.json = {
                name: config.projectName,
                private: true,
                type: config.moduleSystem === "esm" ? "module" : "commonjs",
                version: "0.0.0",
            } satisfies PackageJson;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if the file contains a dependency
    //------------------------------------------------------------------------------------------------------------------

    public containsDependency(name: string) {
        const json = this.getJson();
        return [json.dependencies, json.devDependencies].some(dependencies => name in (dependencies ?? {}));
    }

    public containsTypeScriptDependency() {
        return this.containsDependency("typescript");
    }

    //------------------------------------------------------------------------------------------------------------------
    // Retrieve the package json
    //------------------------------------------------------------------------------------------------------------------

    private getJson(): PackageJson {
        return this.file.json ?? {};
    }
}
