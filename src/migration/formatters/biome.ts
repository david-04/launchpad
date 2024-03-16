import { deepMerge } from "../../utilities/object-utilities";
import { MigrationContext } from "../data/migration-context";
import { Formatter } from "./formatter";

//----------------------------------------------------------------------------------------------------------------------
// Default Biome configuration
//----------------------------------------------------------------------------------------------------------------------

function getDefaultBiomeConfiguration(tabSize: number) {
    return {
        $schema: "https://biomejs.dev/schemas/1.4.1/schema.json",
        files: {
            ignoreUnknown: true,
        },
        vcs: {
            enabled: false,
        },
        linter: {
            enabled: false,
        },
        formatter: {
            enabled: true,
            formatWithErrors: true,
            indentStyle: "space",
            indentWidth: tabSize,
            lineEnding: "lf",
            lineWidth: 120,
        },
        organizeImports: {
            enabled: false,
        },
        javascript: {
            parser: {
                unsafeParameterDecoratorsEnabled: true,
            },
            formatter: {
                quoteStyle: "double",
                jsxQuoteStyle: "double",
                quoteProperties: "asNeeded",
                trailingComma: "es5",
                semicolons: "always",
                arrowParentheses: "asNeeded",
                enabled: true,
                bracketSameLine: false,
                bracketSpacing: true,
            },
        },
        json: {
            parser: {
                allowComments: true,
                allowTrailingCommas: false,
            },
            formatter: {
                enabled: true,
            },
        },
    } as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Biome code formatter
//----------------------------------------------------------------------------------------------------------------------

export class Biome extends Formatter {
    public constructor() {
        super(
            ["json", "jsonc", "javascript", "javascriptreact", "typescript", "typescriptreact"],
            "biomejs.biome",
            updateBiomeConfigurationExcludingVsCode,
            removeBiomeConfigurationExcludingVsCode
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update the Biome formatting options
//----------------------------------------------------------------------------------------------------------------------

function updateBiomeConfigurationExcludingVsCode(context: MigrationContext) {
    const { tabSize } = context.newConfig;
    const configFile = context.files.get("biome.json");
    const currentConfig = JSON.parse(configFile.contents?.trim() || "{}");
    const defaultConfig = getDefaultBiomeConfiguration(tabSize);
    const json = deepMerge(defaultConfig, currentConfig);
    json.formatter = { ...json.formatter, indentWidth: tabSize };
    configFile.contents = JSON.stringify(json, undefined, tabSize);
}

//----------------------------------------------------------------------------------------------------------------------
// Remove the Biome formatting options
//----------------------------------------------------------------------------------------------------------------------

function removeBiomeConfigurationExcludingVsCode(context: MigrationContext) {
    const configFile = context.files.get("biome.json");
    if (configFile.exists) {
        const config = JSON.parse(configFile.contents?.trim() || "{}");
        if (true !== config?.linter?.enabled) {
            configFile.delete();
        }
    }
}
