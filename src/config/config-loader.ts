import type { Path } from "../utilities/path.js";
import type { AddError, ConfigFileProperties, ConfigFileProperty, FormatError } from "./config-data-types.js";
import { assembleConfig, validateConfig } from "./config-objects.js";
import { ConfigProperties } from "./config-properties.js";

//----------------------------------------------------------------------------------------------------------------------
// Load the config file
//----------------------------------------------------------------------------------------------------------------------

export function loadConfigFile(configFile: Path) {
    if (configFile.existsAndIsFile()) {
        const properties = new Array<ConfigFileProperty>();
        const addProperty = createAddPropertyHandler(properties);
        const errors = new Array<string>();
        configFile
            .loadFileContents()
            .split(/\r?\n/)
            .map(line => ({ line }))
            .map((item, index) => ({ ...item, ...createErrorHandlers(index, errors) }))
            .forEach(item => processLine(item.line, item.formatError, item.addError, addProperty));
        return parseConfig(configFile, properties, errors);
    } else {
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create an error handler that can format and store error messages related to a specific configuration file line
//----------------------------------------------------------------------------------------------------------------------

function createErrorHandlers(index: number, errors: Array<string>) {
    const formatError = createFormatErrorHandler(index);
    const addError = createAddErrorHandler(formatError, errors);
    return { formatError, addError };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a line-specific error message formatter
//----------------------------------------------------------------------------------------------------------------------

function createFormatErrorHandler(index: number) {
    return (message: string) => `Line ${index + 1}: ${message}`;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a handler to store formatted error messages
//----------------------------------------------------------------------------------------------------------------------

function createAddErrorHandler(format: FormatError, errors: Array<string>) {
    return (message: string) => {
        errors.push(format(message));
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a handler to store a successfully parsed key-value property pair
//----------------------------------------------------------------------------------------------------------------------

function createAddPropertyHandler(properties: Array<ConfigFileProperty>) {
    return (key: string, value: string, formatError: FormatError) => {
        properties.push({ key, value, formatError });
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Process a single line
//----------------------------------------------------------------------------------------------------------------------

function processLine(
    line: string,
    formatError: FormatError,
    addError: AddError,
    addProperty: ReturnType<typeof createAddPropertyHandler>
) {
    const trimmed = line.replace(/#.*/, "").trim();
    if (trimmed) {
        const pair = splitLine(trimmed, addError);
        if (pair) {
            addProperty(pair.key, pair.value, formatError);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Split the given line into key and value
//----------------------------------------------------------------------------------------------------------------------

function splitLine(line: string, addError: AddError) {
    const index = line.indexOf("=");
    if (0 < index) {
        const key = line.substring(0, index).trim();
        return { key, value: line.substring(index + 1).trim() } as const;
    } else {
        addError("The line is not in key=value format");
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Convert a set of properties to a config object
//----------------------------------------------------------------------------------------------------------------------

function parseConfig(configFilePath: Path, properties: ConfigFileProperties, errors: Array<string>) {
    const addError = (message: string) => errors.push(message);
    validatePropertyKeys(properties, addError);
    const partial = assembleConfig(properties, addError);
    const validated = errors.length ? undefined : validateConfig(partial, addError);
    const configFile = configFilePath.path.replace(/.*\/\.launchpad\//, ".launchpad/");
    return { configFile, partial, validated, errors: errors.length ? errors : undefined };
}

export type ParsedConfig = ReturnType<typeof parseConfig>;

//----------------------------------------------------------------------------------------------------------------------
// Check if there are any unknown properties
//----------------------------------------------------------------------------------------------------------------------

function validatePropertyKeys(properties: ConfigFileProperties, addError: AddError) {
    for (const configFileProperty of properties) {
        if (!ConfigProperties.arrays.all.some(property => property.matchesConfigFileKey(configFileProperty.key))) {
            addError(configFileProperty.formatError(`Unknown config property "${configFileProperty.key}"`));
        }
    }
}
