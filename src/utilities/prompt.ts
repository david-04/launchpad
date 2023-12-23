import { exit } from "process";
import { type Choice, type PromptObject } from "prompts";
import { unpinned, type ConfigError, type PinnableEnumValue } from "../config/config-data-types";
import { defaultMightChange } from "./constants";

const prompts = require("prompts");

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type ChoiceOption<T> = readonly [string, string | undefined, T, boolean?];
export type ChoiceOptions<T> = ReadonlyArray<ChoiceOption<T>>;

//----------------------------------------------------------------------------------------------------------------------
// Force-pin an enum value
//----------------------------------------------------------------------------------------------------------------------

export function forcePinned<T>(value: PinnableEnumValue<T>) {
    return { value: value.value, pinned: true } as const;
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

export async function promptMultiSelect(options: Omit<PromptObject<string>, "name">) {
    return await prompt<ReadonlyArray<string>>({
        instructions: false,
        hint: "[space | arrow right/left] = toggle selection; [enter / return] = save and continue",
        ...options,
    });
}

export async function promptYesNo(options: { message: string; default: boolean; yesHint?: string; noHint?: string }) {
    return await prompt<boolean>({
        type: "select",
        message: options.message,
        choices: [
            { title: "Yes", value: true, description: options.yesHint },
            { title: "No", value: false, description: options.noHint },
        ],
        initial: options.default ? 0 : 1,
    });
}
