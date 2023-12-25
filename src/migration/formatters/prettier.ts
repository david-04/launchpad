import { MigrationContext } from "migration/data/migration-context";
import { PackageJsonOperations, PackageJsonPrettier } from "migration/files/package-json";
import { Formatter } from "./formatter";

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
    setProperty(packageJson, "arrowParens", "avoid");
    setProperty(packageJson, "bracketSameLine", false);
    setProperty(packageJson, "bracketSpacing", true);
    setProperty(packageJson, "embeddedLanguageFormatting", "auto");
    setProperty(packageJson, "endOfLine", "lf");
    setProperty(packageJson, "htmlWhitespaceSensitivity", "css");
    setProperty(packageJson, "jsxSingleQuote", false);
    setProperty(packageJson, "printWidth", 120);
    setProperty(packageJson, "proseWrap", "preserve");
    setProperty(packageJson, "quoteProps", "as-needed");
    setProperty(packageJson, "semi", true);
    setProperty(packageJson, "singleAttributePerLine", false);
    setProperty(packageJson, "singleQuote", false);
    setProperty(packageJson, "tabWidth", context.newConfig.tabSize, "overwrite");
    setProperty(packageJson, "trailingComma", "es5");
    setProperty(packageJson, "useTabs", false);
}

function setProperty<T extends keyof PackageJsonPrettier>(
    packageJson: PackageJsonOperations,
    key: T,
    value: PackageJsonPrettier[T],
    overwrite?: "overwrite"
) {
    const prettierConfig = packageJson.getPrettierConfiguration();
    if (prettierConfig[key] !== value || overwrite === "overwrite") {
        packageJson.setPrettierConfiguration({ ...prettierConfig, [key]: value });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Remove the Prettier formatting options from package.json
//----------------------------------------------------------------------------------------------------------------------

function removePrettierConfigurationExcludingVsCode(context: MigrationContext) {
    context.fileOperations.packageJson.deletePrettierConfiguration();
}
