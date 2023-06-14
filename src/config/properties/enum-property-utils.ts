import {
    DEFAULT_ENUM as DEFAULT,
    DISABLED_ENUM as DISABLED,
    PINNED_SUFFIX as PINNED,
} from "../../utilities/constants.js";
import type { ConfigPropertyDescriptor as ConfigPropertyDescriptor } from "./property-descriptor.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type EnumMetadata<CURRENT extends string, OBSOLETE extends string> = {
    configFileKey: string;
    commandLineParameter: string;
    promptQuestion: string;
    currentValues: ReadonlyArray<{
        value: CURRENT;
        promptDescription: string | undefined;
    }>;
    obsoleteValues: ReadonlyArray<OBSOLETE>;
    mandatory: boolean;
};

//----------------------------------------------------------------------------------------------------------------------
// Construct a metadata object for an enum
//----------------------------------------------------------------------------------------------------------------------

export function createEnum<CURRENT extends string, OBSOLETE extends string>(metadata: EnumMetadata<CURRENT, OBSOLETE>) {
    const currentValues = [...metadata.currentValues.map(item => item.value)] as const;
    const allValues = [...currentValues, ...(metadata.obsoleteValues ?? [])] as const;

    const descriptor = {
        ...metadata,
        currentValues,
        allValues,
        promptOptions: [...metadata.currentValues] as const,
        configFileComment: currentValues.join(", "),
    } as const;

    return {
        ...descriptor,
        pinnableWithDefault: (propertyType: string, defaultValue: CURRENT) => {
            return {
                ...descriptor,
                defaultValue,
                parseNewValue: createPinnableNewValueParser(propertyType, descriptor.currentValues, defaultValue),
                parseOldValue: createPinnableOldValueParser(metadata.configFileKey, allValues),
            } as const satisfies ConfigPropertyDescriptor;
        },
        nonPinnable: (propertyType: string) => {
            return {
                ...descriptor,
                parseNewValue: createNonPinnableNewValueParser(propertyType, descriptor.currentValues),
                parseOldValue: createNonPinnableOldValueParser(metadata.configFileKey, allValues),
            } as const satisfies ConfigPropertyDescriptor;
        },
    } as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for new values of a pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function createPinnableNewValueParser<CURRENT extends string>(
    propertyType: string,
    allowedValues: ReadonlyArray<CURRENT>,
    defaultValue: CURRENT
) {
    return (value: string) => {
        const trimmed = value.trim();
        if (trimmed === DEFAULT) {
            return toEnumValue(defaultValue, false);
        }
        const validated = findEnumValue(allowedValues, trimmed);
        if (undefined === validated) {
            const list = [DEFAULT, ...allowedValues].join(", ");
            return { error: `Invalid ${propertyType} "${trimmed}" (allowed values: ${list})` };
        } else {
            return toEnumValue(validated, true);
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for an old value of a pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function createPinnableOldValueParser<ALL extends string>(propertyKey: string, allowedValues: ReadonlyArray<ALL>) {
    return (value: string) => {
        const { trimmed, pinned } = destructurePinnableValue(value);
        const validated = findEnumValue(allowedValues, trimmed);
        if (undefined === validated) {
            const list = [DEFAULT, ...allowedValues].join(", ");
            return { error: `Invalid value for property ${propertyKey}: "${trimmed}" (allowed values: ${list})` };
        } else {
            return toEnumValue(validated, pinned);
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for the new value of a non-pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function createNonPinnableNewValueParser<CURRENT extends string>(
    propertyType: string,
    allowedValues: ReadonlyArray<CURRENT>
) {
    return (value: string) => {
        const trimmed = value.trim();
        const validated = findEnumValue(allowedValues, trimmed);
        if (undefined === validated) {
            const list = [DEFAULT, ...allowedValues].join(", ");
            return { error: `Invalid ${propertyType} "${trimmed}" (allowed values: ${list})` };
        } else {
            return validated;
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for the old value of a non-pinnable enum
//----------------------------------------------------------------------------------------------------------------------

function createNonPinnableOldValueParser<ALL extends string>(propertyKey: string, allowedValues: ReadonlyArray<ALL>) {
    return (value: string) => {
        const trimmed = value.trim();
        const validated = findEnumValue(allowedValues, trimmed);
        if (undefined === validated) {
            const list = allowedValues.join(", ");
            return { error: `Invalid value "${trimmed}" for property ${propertyKey} (allowed values: ${list})` };
        } else {
            return validated;
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Find (and return) a value in an array
//----------------------------------------------------------------------------------------------------------------------

function findEnumValue<T extends string>(allowedValues: ReadonlyArray<T>, value: string): T | undefined {
    for (let index = 0; index < allowedValues.length; index++) {
        const currentValue = allowedValues[index];
        if (currentValue === value) {
            return currentValue;
        }
    }
    return undefined;
}

//----------------------------------------------------------------------------------------------------------------------
// Extract the ::pinned suffix from a value
//----------------------------------------------------------------------------------------------------------------------

function destructurePinnableValue(value: string) {
    const trimmed = value.trim();
    return trimmed.endsWith(PINNED)
        ? { trimmed: trimmed.substring(0, trimmed.length - PINNED.length).trim(), pinned: true }
        : { trimmed, pinned: false };
}

//----------------------------------------------------------------------------------------------------------------------
// Wrap a string into a pinnable enum container
//----------------------------------------------------------------------------------------------------------------------

function toEnumValue<T extends string>(value: T, pinned: boolean) {
    return {
        value,
        pinned: pinned,
        render: () => (!pinned || value === DISABLED ? value : `${value}${PINNED}`),
    };
}
