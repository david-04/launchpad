import { MigrationContext } from "migration/data/migration-context";
import { getAllFormattersExcept, getFormatter } from "migration/formatters/formatter-registry";

//----------------------------------------------------------------------------------------------------------------------
// Configure the formatter
//----------------------------------------------------------------------------------------------------------------------

export function configureFormatter(context: MigrationContext) {
    removeUnusedFormatterConfiguration(context);
    addActiveFormatterConfiguration(context);
}

//----------------------------------------------------------------------------------------------------------------------
// Remove configuration for all unused formatters
//----------------------------------------------------------------------------------------------------------------------

function removeUnusedFormatterConfiguration(context: MigrationContext) {
    for (const formatter of getAllFormattersExcept(context.newConfig.formatter.value)) {
        formatter.removeConfigurationExcludingVsCode(context);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Configure the currently used formatter
//----------------------------------------------------------------------------------------------------------------------

function addActiveFormatterConfiguration(context: MigrationContext) {
    const formatter = getFormatter(context.newConfig.formatter.value);
    formatter.createOrUpdateConfigurationExcludingVsCode(context);
    formatter.applyToVsCodeSettings(context);
}
