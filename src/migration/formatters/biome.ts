import { VERSION_0_0_0, VERSION_1_0_17, VERSION_1_0_7 } from "../../config/version-number";
import { ASSETS } from "../../resources/embedded-assets.generated";
import { File } from "../data/file";
import { BIOME_JSON } from "../data/known-files";
import { MigrationContext } from "../data/migration-context";
import { Formatter } from "./formatter";

//----------------------------------------------------------------------------------------------------------------------
// Biome code formatter
//----------------------------------------------------------------------------------------------------------------------

export class Biome extends Formatter {
    public constructor() {
        super(
            ["css", "json", "jsonc", "javascript", "javascriptreact", "typescript", "typescriptreact"],
            "biomejs.biome",
            updateBiomeConfigurationExcludingVsCode,
            removeConfigurationExcludingVscode
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update the Biome formatting options
//----------------------------------------------------------------------------------------------------------------------

function updateBiomeConfigurationExcludingVsCode(context: MigrationContext) {
    const file = context.files.get(BIOME_JSON);
    if (file.exists) {
        migrateExistingBiomeJson(file, context);
    } else {
        file.contents = ASSETS[BIOME_JSON];
    }
    if (context.newConfig.vsCodeSettings.has("formatter")) {
        context.fileOperations.vscodeSettings.json = {
            ...context.fileOperations.vscodeSettings.json,
            "biome.configurationPath": null,
        };
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Remove Biome configuration
//----------------------------------------------------------------------------------------------------------------------

function removeConfigurationExcludingVscode(context: MigrationContext) {
    context.files.get(BIOME_JSON).delete();
    if (context.newConfig.vsCodeSettings.has("formatter")) {
        const vscodeSettings = context.fileOperations.vscodeSettings.json;
        delete vscodeSettings["biome.configurationPath"];
        context.fileOperations.vscodeSettings.json = vscodeSettings;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Migrate Biome settings
//----------------------------------------------------------------------------------------------------------------------

function migrateExistingBiomeJson(file: File, context: MigrationContext) {
    if ((context.oldConfig?.version ?? VERSION_0_0_0).compareTo(VERSION_1_0_7) < 0) {
        migrateTo107(file);
    }
    if ((context.oldConfig?.version ?? VERSION_0_0_0).compareTo(VERSION_1_0_17) < 0) {
        migrateTo1017(file);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// 1.0.7 - Remove inlined configuration and include .launchpad/biome.default.json instead
//----------------------------------------------------------------------------------------------------------------------

function migrateTo107(file: File) {
    removeObsoleteDefaultSettings(file);
    addExtends(file);
}

function removeObsoleteDefaultSettings(file: File) {
    const json = file.json;

    deleteIfValueMatches(json?.files, "ignoreUnknown", true);
    deleteIfEmptyObject(json, "files");

    deleteIfValueMatches(json?.vcs, "enabled", false);
    deleteIfEmptyObject(json, "vcs");

    deleteIfValueMatches(json?.linter, "enabled", false);
    deleteIfEmptyObject(json, "linter");

    deleteIfValueMatches(json?.formatter, "enabled", true);
    deleteIfValueMatches(json?.formatter, "formatWithErrors", true);
    deleteIfValueMatches(json?.formatter, "indentStyle", "space");
    if (json?.formatter?.indentWidth !== undefined) {
        delete json.formatter.indentWidth;
    }
    deleteIfValueMatches(json?.formatter, "lineEnding", "lf");
    deleteIfValueMatches(json?.formatter, "lineWidth", 120); // NOSONAR
    deleteIfEmptyObject(json, "formatter");

    deleteIfValueMatches(json?.organizeImports, "enabled", false);
    deleteIfEmptyObject(json, "organizeImports");

    deleteIfValueMatches(json?.javascript?.parser, "unsafeParameterDecoratorsEnabled", true);
    deleteIfEmptyObject(json?.javascript, "parser");
    deleteIfValueMatches(json?.javascript?.formatter, "quoteStyle", "double");
    deleteIfValueMatches(json?.javascript?.formatter, "jsxQuoteStyle", "double");
    deleteIfValueMatches(json?.javascript?.formatter, "quoteProperties", "asNeeded");
    deleteIfValueMatches(json?.javascript?.formatter, "trailingComma", "es5");
    deleteIfValueMatches(json?.javascript?.formatter, "trailingCommas", "es5");
    deleteIfValueMatches(json?.javascript?.formatter, "semicolons", "always");
    deleteIfValueMatches(json?.javascript?.formatter, "arrowParentheses", "asNeeded");
    deleteIfValueMatches(json?.javascript?.formatter, "bracketSameLine", false);
    deleteIfValueMatches(json?.javascript?.formatter, "bracketSpacing", true);
    deleteIfValueMatches(json?.javascript?.formatter, "enabled", true);
    deleteIfEmptyObject(json?.javascript, "formatter");
    deleteIfEmptyObject(json, "javascript");

    deleteIfValueMatches(json?.json?.parser, "allowComments", true);
    deleteIfValueMatches(json?.json?.parser, "allowTrailingCommas", false);
    deleteIfEmptyObject(json?.json, "parser");
    deleteIfValueMatches(json?.json?.formatter, "enabled", true);
    deleteIfEmptyObject(json?.json, "formatter");
    deleteIfEmptyObject(json, "json");

    file.json = json;
}

function deleteIfValueMatches<T, K extends keyof T>(object: T | undefined, key: K, valueOrValues: unknown) {
    const values = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
    if (object && "object" === typeof object && key in object && values.includes(object[key])) {
        delete object[key];
    }
}

function deleteIfEmptyObject<T, K extends keyof T>(object: T, key: K) {
    if (object && "object" === typeof object && key in object) {
        if (object[key] && "object" === typeof object[key] && !Object.keys(object[key]).length) {
            delete object[key as keyof typeof object];
        }
    }
}

function addExtends(file: File) {
    const json = file.json;
    const pathFromTemplate = JSON.parse(ASSETS[BIOME_JSON]).extends[0];
    json.extends ??= [];
    if (!json.extends.some((path: string) => path === pathFromTemplate)) {
        json.extends.push(pathFromTemplate);
    }
    file.json = json;
}

//----------------------------------------------------------------------------------------------------------------------
// 1.0.17 - Remove the schema URL
//----------------------------------------------------------------------------------------------------------------------

function migrateTo1017(file: File) {
    const json = file.json;
    delete json.$schema;
    file.json = json;
}
