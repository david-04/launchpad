import { PINNED_SUFFIX } from "../utilities/constants.js";
import type { ConfigError } from "./config-data-types.js";
import { Version } from "./version-number.js";

//----------------------------------------------------------------------------------------------------------------------
// Parse the project name
//----------------------------------------------------------------------------------------------------------------------

export function parseProjectName(value: string) {
    const trimmed = value.trim();
    if (trimmed) {
        return error("The project name must not be empty");
    } else if (trimmed.match(/[\\\/:*<>$#?]/)) {
        return error("The project name must be a valid file name and not contain any special characters");
    } else {
        return trimmed;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse a directory
//----------------------------------------------------------------------------------------------------------------------

export function createDirectoryParser(type: string, mode: "optional" | "mandatory") {
    return (value: string) => {
        const trimmed = value.trim().replace(/\\/g, "/");
        if (!trimmed && "mandatory" === mode) {
            return error(`The ${type} must neither be empty nor the current directory`);
        } else if (trimmed.match(/^(\/|[a-z]:)/i)) {
            return error(`The ${type} must not be a relative (and not an absolute) path`);
        } else {
            const normalized = trimmed.replace(/(^\.\/)|(\/$)/g, "");
            if (!normalized) {
                return error(`The ${type} must not be the current directory`);
            } else if (normalized.match(/[:*<>$#?]/)) {
                return error(`The ${type} must be a valid path and not contain any special characters`);
            } else {
                return normalized;
            }
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Parse the version number
//----------------------------------------------------------------------------------------------------------------------

export function parseVersion(value: string) {
    const trimmed = value.trim();
    const split = trimmed.split(".").map(value => value.trim());
    const parsed = split.map(segment => (segment.match(/^\d+$/) ? parseInt(value) : NaN));
    const [major, minor, patch, ...other] = parsed;
    const isNumber = (value?: number): value is number => undefined !== value && !isNaN(value) && 0 <= value;
    if (isNumber(major) && isNumber(minor) && isNumber(patch) && !other.length) {
        return new Version(major, minor, patch);
    } else {
        return error(`"${trimmed}" is not a valid version number`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for non-pinnable enum values
//----------------------------------------------------------------------------------------------------------------------

export function createNonPinnableEnumParser<T extends string>(allowedValues: ReadonlyArray<T>) {
    return (value: string) => {
        return allowedValues.some(allowed => allowed === value)
            ? (value as T)
            : error(`"${value}" is not a valid value (allowed: ${allowedValues.join(",")})`);
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for pinnable enum values
//----------------------------------------------------------------------------------------------------------------------

export function createPinnableEnumParser<T extends string>(allowedValues: ReadonlyArray<T>) {
    const parser = createNonPinnableEnumParser(allowedValues);
    return (value: string) => {
        const trimmed = value.trim();
        const pinned = trimmed.endsWith(PINNED_SUFFIX);
        const unpinned = parser(pinned ? trimmed.substring(0, PINNED_SUFFIX.length) : trimmed);
        return "string" === typeof unpinned ? { value: unpinned, pinned } : (unpinned as ConfigError);
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Wrap an error message into an error
//----------------------------------------------------------------------------------------------------------------------

function error(message: string) {
    return { error: message } as const;
}
