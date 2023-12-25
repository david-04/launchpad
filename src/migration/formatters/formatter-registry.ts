import { NewConfig, OldConfig } from "config/config-objects";
import { Biome } from "./biome";
import { Formatter } from "./formatter";
import { NoFormatter } from "./no-formatter";
import { Prettier } from "./prettier";

//----------------------------------------------------------------------------------------------------------------------
// Formatters
//----------------------------------------------------------------------------------------------------------------------

const FORMATTERS = {
    disabled: new NoFormatter(),
    prettier: new Prettier(),
    biome: new Biome(),
} as const satisfies Record<NewConfig["formatter"]["value"] | OldConfig["formatter"]["value"], Formatter>;

//----------------------------------------------------------------------------------------------------------------------
// Get one or more formatters
//----------------------------------------------------------------------------------------------------------------------

export function getAllFormatters() {
    return getFormatters(() => true);
}

export function getFormatter(formatter: keyof typeof FORMATTERS) {
    return FORMATTERS[formatter];
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
