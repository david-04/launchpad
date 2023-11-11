import type { File } from "../data/file-cache.js";

//----------------------------------------------------------------------------------------------------------------------
// Type definitions
//----------------------------------------------------------------------------------------------------------------------

export type PackageJsonValue = string | number | boolean;
export type PackageJsonObject = { [index: string]: PackageJsonValue | PackageJsonObject | PackageJsonArray };
export type PackageJsonArray = Array<PackageJsonValue | PackageJsonObject | PackageJsonArray>;

export type PackageJson = PackageJsonObject & {
    readonly dependencies?: { readonly [index: string]: string };
    readonly devDependencies?: { readonly [index: string]: string };
    readonly name?: string;
    readonly prettier?: PackageJsonPrettier;
    readonly private?: boolean;
    readonly scripts?: { readonly [index: string]: string };
    readonly type?: "module" | "commonjs";
    readonly version?: string;
    readonly swpm?: "npm" | "yarn" | "yarn@berry" | "pnpm" | "bun";
};

export type PackageJsonPrettier = {
    readonly arrowParens?: "avoid" | "always";
    readonly bracketSameLine?: boolean;
    readonly bracketSpacing?: boolean;
    readonly embeddedLanguageFormatting?: "off" | "auto";
    readonly endOfLine?: "lf" | "crlf" | "cr" | "auto";
    readonly htmlWhitespaceSensitivity?: "css" | "strict" | "ignore";
    readonly jsxSingleQuote?: boolean;
    readonly printWidth?: number;
    readonly proseWrap?: "always" | "never" | "preserve";
    readonly quoteProps?: "as-needed" | "consistent" | "preserve";
    readonly semi?: boolean;
    readonly singleAttributePerLine?: boolean;
    readonly singleQuote?: boolean;
    readonly tabWidth?: number;
    readonly trailingComma?: "all" | "es5" | "none";
    readonly useTabs?: boolean;
};

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for the package.json file
//----------------------------------------------------------------------------------------------------------------------

export class PackageJsonOperations {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly file: File) {}

    //------------------------------------------------------------------------------------------------------------------
    // Get and set the whole JSON
    //------------------------------------------------------------------------------------------------------------------

    public get json(): PackageJson {
        return this.file.json ?? {};
    }

    public set json(json: PackageJson) {
        this.file.json = json;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Prettier configuration
    //------------------------------------------------------------------------------------------------------------------

    public get PrettierConfig() {
        return this.json.prettier;
    }

    public setPrettierConfig(config: PackageJsonPrettier) {
        this.file.json = { ...this.json, prettier: config } as const satisfies PackageJson;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Dependencies
    //------------------------------------------------------------------------------------------------------------------

    public containsDependency(name: string) {
        return [this.json.dependencies, this.json.devDependencies].some(dependencies => name in (dependencies ?? {}));
    }

    public containsTypeScriptDependency() {
        return this.containsDependency("typescript");
    }

    public removeDependencyIfExists(name: string) {
        return !![this.json.dependencies, this.json.devDependencies].filter(dependencies => {
            if (dependencies && name in dependencies) {
                delete (dependencies as Record<typeof name, unknown>)[name];
                return true;
            } else {
                return false;
            }
        }).length;
    }

    public addDependencyIfNotExists(name: string, version: string) {
        if (this.containsDependency(name)) {
            return false;
        } else {
            this.json = { ...this.json, dependencies: { ...this.json.dependencies, [name]: version } };
            return true;
        }
    }

    public addDevDependencyIfNotExists(name: string, version: string) {
        if (this.containsDependency(name)) {
            return false;
        } else {
            this.json = { ...this.json, devDependencies: { ...this.json.devDependencies, [name]: version } };
            return true;
        }
    }
}
