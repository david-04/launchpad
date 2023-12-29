import { MigrationContext } from "migration/data/migration-context";
import { getAllFormattersExcept, getFormatter } from "migration/formatters/formatter-registry";

//----------------------------------------------------------------------------------------------------------------------
// Configure the formatter
//----------------------------------------------------------------------------------------------------------------------

export function configureFormatter(context: MigrationContext) {
    for (const formatter of getAllFormattersExcept(context.newConfig.formatter.value)) {
        formatter.removeConfigurationExcludingVsCode(context);
    }
    getFormatter(context.newConfig.formatter.value).createOrUpdateConfigurationExcludingVsCode(context);
}
