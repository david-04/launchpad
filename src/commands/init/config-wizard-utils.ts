import { exit } from "process";
import prompts, { type Choice, type PromptObject } from "prompts";
import { unpinned, type ConfigError, type PinnableEnumValue } from "../../config/config-data-types.js";
import { defaultMightChange } from "../../utilities/constants.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type ChoiceOption<T> = readonly [string, string | undefined, T, boolean?];
export type ChoiceOptions<T> = ReadonlyArray<ChoiceOption<T>>;

//----------------------------------------------------------------------------------------------------------------------
// Force-pin an enum value
//----------------------------------------------------------------------------------------------------------------------

export function toPinned<T>(value: PinnableEnumValue<T>) {
    return { value: value.value, pinned: true };
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a parser function into a validator
//----------------------------------------------------------------------------------------------------------------------

export function toValidator(parseNewValue: (value: string, source: string | undefined) => string | ConfigError) {
    return (value: string) => {
        const result = parseNewValue(value, undefined);
        return result && "object" === typeof result && "error" in result ? result.error : true;
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a "default" option that currently resolves to the given value
//----------------------------------------------------------------------------------------------------------------------

export function createDefaultOption<T extends string>(value: T) {
    return ["default", defaultMightChange(value), unpinned(value)] as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a drop-down value to an option
//----------------------------------------------------------------------------------------------------------------------

export function toChoice<T>(options: ChoiceOptions<T>): Choice[] {
    return options.map(option => ({ title: option[0], description: option[1], value: option[2], selected: option[3] }));
}

//----------------------------------------------------------------------------------------------------------------------
// Find the best initial choice for a non-pinnable enum
//----------------------------------------------------------------------------------------------------------------------

export function findNonPinnableMatchingChoice<T extends string>(
    choices: ChoiceOptions<T>,
    ...selectedValues: ReadonlyArray<T | undefined>
) {
    for (const selectedValue of selectedValues) {
        const index = choices.findIndex(choice => choice[0] === selectedValue);
        if (0 <= index) {
            return index;
        }
    }
    return 0;
}

//----------------------------------------------------------------------------------------------------------------------
// Find the best initial choice for a pinnable enum
//----------------------------------------------------------------------------------------------------------------------

export function findPinnableMatchingChoice<T extends string>(
    choices: ChoiceOptions<PinnableEnumValue<T>>,
    ...selectedValues: ReadonlyArray<PinnableEnumValue<T> | undefined>
) {
    console.log(choices);
    console.log(selectedValues);
    for (const selectedValue of selectedValues) {
        if (selectedValue) {
            const index1 = choices.findIndex(
                choice => choice[2].pinned === selectedValue.pinned && choice[2].value === selectedValue.value
            );
            if (0 <= index1) {
                return index1;
            }
            const index2 = choices.findIndex(choice => choice[2].value === selectedValue.value);
            if (0 <= index2) {
                return index2;
            }
        }
    }
    return 0;
}

//----------------------------------------------------------------------------------------------------------------------
// Prompt wrapper that exits if the returned value is "undefined"                     https://github.com/terkelg/prompts
//----------------------------------------------------------------------------------------------------------------------

export async function prompt<T>(options: Omit<PromptObject<string>, "name">): Promise<T> {
    return ((await prompts({ ...options, name: "RESULT" })) ?? {})["RESULT"] ?? exit(1);
}
