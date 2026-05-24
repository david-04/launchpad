import { NewConfig, OldConfig } from "../../config/config-objects";
import { MigrationContext } from "../data/migration-context";
import { Biome } from "./biome";
import { Formatter } from "./formatter";
import { NoFormatter } from "./no-formatter";
import { Oxfmt } from "./oxfmt";
import { Prettier } from "./prettier";

//----------------------------------------------------------------------------------------------------------------------
// Formatters
//----------------------------------------------------------------------------------------------------------------------

const FORMATTERS = {
    biome: new Biome(),
    disabled: new NoFormatter(),
    oxfmt: new Oxfmt(),
    prettier: new Prettier(),
} as const satisfies Record<NewConfig["formatter"]["value"] | OldConfig["formatter"]["value"], Formatter>;

//----------------------------------------------------------------------------------------------------------------------
// Get one or more formatters
//----------------------------------------------------------------------------------------------------------------------

export function getAllFormatters() {
    return getFormatters(() => true);
}

export function getFormatter(formatterOrContext: keyof typeof FORMATTERS | MigrationContext) {
    return FORMATTERS[
        "string" === typeof formatterOrContext ? formatterOrContext : formatterOrContext.newConfig.formatter.value
    ];
}

export function getAllFormattersExcept(formatter: keyof typeof FORMATTERS) {
    return getFormatters(currentFormatter => currentFormatter !== formatter);
}

//----------------------------------------------------------------------------------------------------------------------
// Filter formatters
//----------------------------------------------------------------------------------------------------------------------

function getFormatters(filter: (key: keyof typeof FORMATTERS) => unknown) {
    const result = new Array<Formatter>();
    for (const formatter of Object.keys(FORMATTERS) as (keyof typeof FORMATTERS)[]) {
        if (formatter in FORMATTERS && filter(formatter)) {
            result.push(FORMATTERS[formatter]);
        }
    }
    return result;
}
