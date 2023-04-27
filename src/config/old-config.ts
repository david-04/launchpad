import type { Path } from "../utilities/path.js";
import { Version } from "./version.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export interface OldConfig {
    version?: ReturnType<typeof parseVersion>;
    runtime?: ReturnType<typeof parseRuntime>;
    artifact?: ReturnType<typeof parseArtifact>;
    module?: ReturnType<typeof parseModule>;
    srcDir?: ReturnType<typeof parseSrcDir>;
    tscOutDir?: ReturnType<typeof parseTscOutDir>;
    bundlerOutDir?: ReturnType<typeof parseBundlerOutDir>;
    bundler?: ReturnType<typeof parseBundler>;
    formatter?: ReturnType<typeof parseFormatter>;
    packageManager?: ReturnType<typeof parsePackageManager>;
}

//----------------------------------------------------------------------------------------------------------------------
// Utility types
//----------------------------------------------------------------------------------------------------------------------

type Line = { lineNumber: number; content: string };
type ErrorLine = Line & { error: string };
type SplitLine = Line & { key: string; value: string };

type Properties = ReadonlyArray<{
    key: string;
    parse: (config: OldConfig, line: SplitLine, errors: Array<ErrorLine>) => OldConfig;
}>;

//----------------------------------------------------------------------------------------------------------------------
// Load the config file
//----------------------------------------------------------------------------------------------------------------------

export function loadConfigFile(configFile: Path, properties: Properties) {
    const errors = new Array<ErrorLine>();
    const fileContent = configFile.loadFileContents();
    const rawLines = fileContent.split(/\r?\n/).map((line, index) => ({ lineNumber: index + 1, content: line.trim() }));
    const relevantLines = rawLines.filter(line => line.content.match(/^[^#]/));
    const keyValues = splitLines(relevantLines, errors);
    const config = keyValues.reduce((config, line) => reduceLine(properties, config, line, errors), {} as OldConfig);
    return { config, errors };
}

//----------------------------------------------------------------------------------------------------------------------
// Load the file and split it into valid and invalid lines
//----------------------------------------------------------------------------------------------------------------------

function splitLines(lines: ReadonlyArray<Line>, errors: Array<ErrorLine>) {
    const result = new Array<SplitLine>();
    for (const line of lines) {
        try {
            result.push(splitLine(line));
        } catch (error: unknown) {
            errors.push({ ...line, error: error instanceof Error ? error.message : `${error}` });
        }
    }
    return result;
}

//----------------------------------------------------------------------------------------------------------------------
// Split the given line into key and value
//----------------------------------------------------------------------------------------------------------------------

function splitLine(line: Line) {
    const index = line.content.indexOf("=");
    if (0 <= index) {
        const key = line.content.substring(0, index).trim();
        if (key) {
            return { ...line, key, value: line.content.substring(index + 1).trim() } as const;
        }
    }
    throw new Error("Not in key-value format");
}

//----------------------------------------------------------------------------------------------------------------------
// Parse a single line
//----------------------------------------------------------------------------------------------------------------------

function reduceLine(properties: Properties, config: OldConfig, line: SplitLine, errors: Array<ErrorLine>) {
    const property = properties.filter(property => property.key === line.key)[0];
    if (property) {
        return property.parse(config, line, errors);
    } else {
        errors.push({ ...line, error: `Unknown property ${line.key}` });
        return config;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Reducers
//----------------------------------------------------------------------------------------------------------------------

export function createReducer<T>(parse: (key: string, value: string) => T, reduce: (value: T) => OldConfig) {
    return (config: OldConfig, line: SplitLine, errors: Array<ErrorLine>) => {
        try {
            return { ...config, ...reduce(parse(line.key, line.value)) };
        } catch (error: unknown) {
            errors.push({ ...line, error: error instanceof Error ? error.message : `${error}` });
            return config;
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Version parser
//----------------------------------------------------------------------------------------------------------------------

export function parseVersion(_key: string, value: string) {
    return Version.of(value);
}

//----------------------------------------------------------------------------------------------------------------------
// Directory parsers
//----------------------------------------------------------------------------------------------------------------------

export const parseSrcDir = directoryParser("mandatory");
export const parseTscOutDir = directoryParser("mandatory");
export const parseBundlerOutDir = directoryParser("optional");

function directoryParser(mode: "mandatory" | "optional") {
    return (key: string, value: string) => {
        if (value || "optional" === mode) {
            return value;
        } else {
            throw new Error(`${key} is empty`);
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Enum parsers
//----------------------------------------------------------------------------------------------------------------------

export const parseRuntime = enumParser(["node", "web"] as const);
export const parseArtifact = enumParser(["app", "lib"] as const);
export const parseModule = enumParser(["cjs", "esm"] as const);
export const parseBundler = enumParser(["none", "esbuild"] as const);
export const parseFormatter = enumParser(["none", "prettier", "rome"] as const);
export const parsePackageManager = enumParser(["npm", "pnpm", "yarn"] as const);

function enumParser<T extends string>(allowedValues: ReadonlyArray<T>) {
    return (key: string, originalValue: string) => {
        const cleanedValue = originalValue.replace(/::pinned$/, "");
        if (allowedValues.find(allowedValue => allowedValue === cleanedValue)) {
            return { value: cleanedValue as T, pinned: cleanedValue !== originalValue };
        } else {
            throw new Error(`Invalid value ${cleanedValue} for ${key} (allowed values: ${allowedValues.join(", ")})`);
        }
    };
}
