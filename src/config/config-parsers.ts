import { PINNED_SUFFIX } from "../utilities/constants.js";
import type { ConfigError } from "./config-data-types.js";
import { Version } from "./version-number.js";

//----------------------------------------------------------------------------------------------------------------------
// Parse the project name
//----------------------------------------------------------------------------------------------------------------------

export function parseProjectName(value: string, source: string | undefined) {
    const reference = source ? `${source.substring(0, 1).toUpperCase()}${source.substring(1)}` : `The project name`;
    const trimmed = value.trim();
    if (!trimmed) {
        return error(`${reference} must not be empty`);
    } else if (trimmed.match(/[\\\/:*<>$#?]/)) {
        return error(`${reference} must be a valid file name and not contain any special characters`);
    } else {
        return trimmed;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse a directory
//----------------------------------------------------------------------------------------------------------------------

export function createDirectoryParser(type: string, mode: "optional" | "mandatory") {
    return (value: string, source: string | undefined) => {
        const reference = source ? `${source.substring(0, 1).toUpperCase()}${source.substring(1)}` : `The ${type}`;
        const trimmed = value.trim().replace(/\\/g, "/");
        if (!trimmed && "mandatory" === mode) {
            return error(`${reference} must neither be empty nor the current directory`);
        } else if (trimmed.match(/^(\/|[a-z]:)/i)) {
            return error(`${reference} must not be a relative (and not an absolute) path`);
        } else {
            const normalized = trimmed.replace(/(^\.\/)|(\/$)/g, "");
            if (!normalized) {
                return error(`${reference} must not be the current directory`);
            } else if (normalized.match(/[:*<>$#?]/)) {
                return error(`${reference} must be a valid path and not contain any special characters`);
            } else {
                return normalized;
            }
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Parse the version number
//----------------------------------------------------------------------------------------------------------------------

export function parseVersion(value: string, source: string | undefined) {
    const trimmed = value.trim();
    const split = trimmed.split(".").map(value => value.trim());
    const parsed = split.map(segment => (segment.match(/^\d+$/) ? parseInt(segment) : NaN));
    const [major, minor, patch, ...other] = parsed;
    const isNumber = (value?: number): value is number => undefined !== value && !isNaN(value) && 0 <= value;
    if (isNumber(major) && isNumber(minor) && isNumber(patch) && !other.length) {
        return new Version(major, minor, patch);
    } else {
        return source
            ? error(`"${trimmed}" is not a valid value for ${source}`)
            : error(`"${trimmed}" is not a valid version number`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse boolean
//----------------------------------------------------------------------------------------------------------------------

export function parseBoolean(value: string, source: string | undefined) {
    const trimmed = value.trim();
    const normalized = value.toLowerCase();
    if (["t", "true", "y", "yes"].includes(normalized)) {
        return true;
    } else if (["f", "false", "n", "no"].includes(normalized)) {
        return false;
    } else {
        return source
            ? error(`"${trimmed}" is not a valid value for ${source}`)
            : error(`"${trimmed}" is not a valid boolean (allowed values: true/false or yes/no)`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for non-pinnable enum values
//----------------------------------------------------------------------------------------------------------------------

export function createNonPinnableEnumParser<T extends string>(allowedValues: ReadonlyArray<T>) {
    return (value: string, source: string | undefined) => {
        if (allowedValues.some(allowed => allowed === value)) {
            return value as T;
        } else {
            const message = [
                `"${value}" is not a valid value`,
                source ? `for ${source}` : "",
                `(allowed values: ${allowedValues.join(", ")})`,
            ];
            return error(message.join(" ").replace(/ +/g, " "));
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for pinnable enum values
//----------------------------------------------------------------------------------------------------------------------

export function createPinnableEnumParser<T extends string>(allowedValues: ReadonlyArray<T>) {
    const parser = createNonPinnableEnumParser(allowedValues);
    return (value: string, source: string | undefined) => {
        const trimmed = value.trim();
        const pinned = trimmed.endsWith(PINNED_SUFFIX);
        const unpinned = parser(pinned ? trimmed.substring(0, trimmed.length - PINNED_SUFFIX.length) : trimmed, source);
        return "string" === typeof unpinned ? { value: unpinned, pinned } : (unpinned as ConfigError);
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Parse a comma-separated list of values
//----------------------------------------------------------------------------------------------------------------------

export function parseStringArray(value: string) {
    return value
        .split(",")
        .map(value => value.trim())
        .filter(value => value);
}

//----------------------------------------------------------------------------------------------------------------------
// Wrap an error message into an error
//----------------------------------------------------------------------------------------------------------------------

function error(message: string) {
    return { error: message } as const;
}
