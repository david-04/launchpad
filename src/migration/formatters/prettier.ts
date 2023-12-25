import { MigrationContext } from "migration/data/migration-context";
import { Formatter } from "./formatter";

//----------------------------------------------------------------------------------------------------------------------
// Default Prettier configuration
//----------------------------------------------------------------------------------------------------------------------

function getDefaultPrettierConfiguration(tabSize: number) {
    return {
        arrowParens: "avoid",
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: "auto",
        endOfLine: "lf",
        htmlWhitespaceSensitivity: "css",
        jsxSingleQuote: false,
        printWidth: 120,
        proseWrap: "preserve",
        quoteProps: "consistent",
        semi: true,
        singleAttributePerLine: false,
        singleQuote: false,
        tabWidth: tabSize,
        trailingComma: "es5",
        useTabs: false,
    } as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Prettier code formatter
//----------------------------------------------------------------------------------------------------------------------

export class Prettier extends Formatter {
    public constructor() {
        super(
            [
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
            ],
            "esbenp.prettier-vscode",
            updatePrettierConfigurationExcludingVsCode,
            removePrettierConfigurationExcludingVsCode
        );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Update the Prettier formatting options in package.json
//----------------------------------------------------------------------------------------------------------------------

function updatePrettierConfigurationExcludingVsCode(context: MigrationContext) {
    const { packageJson } = context.fileOperations;
    packageJson.json = {
        ...packageJson.json,
        prettier: {
            ...packageJson.json.prettier,
            ...getDefaultPrettierConfiguration(context.newConfig.tabSize),
        },
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Remove the Prettier formatting options from package.json
//----------------------------------------------------------------------------------------------------------------------

function removePrettierConfigurationExcludingVsCode(context: MigrationContext) {
    context.fileOperations.packageJson.deletePrettierConfiguration();
}
