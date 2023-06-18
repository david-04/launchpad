import type { Path } from "../utilities/path.js";
import type { OldConfig } from "./old-config.js";
import { ConfigProperties } from "./properties/all-properties.js";

//----------------------------------------------------------------------------------------------------------------------
// Utility types
//----------------------------------------------------------------------------------------------------------------------

type Consumer = (value: string) => void;
type Line = { lineNumber: number; content: string };
type ErrorLine = (Line & { error: string }) | { error: string };

//----------------------------------------------------------------------------------------------------------------------
// Load the config file
//----------------------------------------------------------------------------------------------------------------------

export function loadConfigFile(configFile: Path) {
    if (configFile.existsAndIsFile()) {
        const errors = new Array<ErrorLine>();
        const processedKeys = new Set<string>();
        const lines = configFile.loadFileContents().split(/\r?\n/);
        const results = lines.map((content, index) =>
            processLine(
                content,
                error => errors.push({ lineNumber: index + 1, error, content }),
                key => processedKeys.add(key)
            )
        );
        const config = results.reduce((a, b) => ({ ...a, ...b }), {});
        ConfigProperties.filter(property => property.mandatory)
            .map(property => property.configFileKey)
            .filter(key => !processedKeys.has(key))
            .forEach(key => errors.push({ error: `Configuration key ${key} is missing` }));
        return { config, errors };
    } else {
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Process a single line
//----------------------------------------------------------------------------------------------------------------------

function processLine(line: string, onError: Consumer, onKeyProcessed: Consumer): OldConfig | undefined {
    const trimmed = line.replace(/#.*/, "").trim();
    if (trimmed) {
        const pair = splitLine(trimmed, onError);
        if (pair) {
            onKeyProcessed(pair.key);
            return processPair(pair.key, pair.value, onError);
        }
    }
    return {};
}

//----------------------------------------------------------------------------------------------------------------------
// Split the given line into key and value
//----------------------------------------------------------------------------------------------------------------------

function splitLine(line: string, onError: Consumer) {
    const index = line.indexOf("=");
    if (0 < index) {
        const key = line.substring(0, index).trim();
        return { key, value: line.substring(index + 1).trim() } as const;
    } else {
        onError("The line is not in key=value format");
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse the value
//----------------------------------------------------------------------------------------------------------------------

function processPair(key: string, value: string, onError: Consumer) {
    const property = ConfigProperties.filter(property => property.configFileKey === key)[0];
    if (property) {
        const oldConfig = property.parseIntoOldConfig(value);
        if ("error" in oldConfig) {
            onError(oldConfig.error);
        } else {
            return oldConfig;
        }
    } else {
        onError(`Unknown property ${key}`);
    }
    return undefined;
}
