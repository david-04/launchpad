import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

//----------------------------------------------------------------------------------------------------------------------
// Settings
//----------------------------------------------------------------------------------------------------------------------

const SOURCE_PATH = "../resources/tsconfig";
const FRAGMENTS_PATH = "../02-facets/";
const TSCONFIG_TEMPLATES_TS = "../src/resources/embedded-tsconfig.ts";
const TSCONFIG_DEFAULT_JSON_IN = "tsconfig.cli-app-cjs.json";
const TSCONFIG_DEFAULT_JSON_OUT = "../.launchpad/tsconfig.default.json";
const INDENT = 4;

//----------------------------------------------------------------------------------------------------------------------
// Main
//----------------------------------------------------------------------------------------------------------------------

const [_node, _script, ...argv] = process.argv;
const files = argv.sort().map(fileName => loadParseAndNormalizeTsconfigJson(SOURCE_PATH, fileName));
createTsconfigTemplateTs(TSCONFIG_TEMPLATES_TS, files);
createTsconfigDefaultJsonFile(TSCONFIG_DEFAULT_JSON_OUT, files, TSCONFIG_DEFAULT_JSON_IN);

//----------------------------------------------------------------------------------------------------------------------
// Load the given tsconfig.*.json file and parse and normalize it
//----------------------------------------------------------------------------------------------------------------------

function loadParseAndNormalizeTsconfigJson(path, fileName) {
    const relativePath = join(path, fileName);
    const rawContent = loadFile(relativePath);
    const parsedContent = parseJson(relativePath, rawContent);
    const normalizedContent = normalizeTsconfig(fileName, parsedContent);
    return { name: fileName, json: normalizedContent };
}

//----------------------------------------------------------------------------------------------------------------------
// Load a file
//----------------------------------------------------------------------------------------------------------------------

function loadFile(relativePath) {
    try {
        return readFileSync(relativePath, "utf-8");
    } catch (error) {
        throw new Error(`Failed to load ${relativePath}: ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Parse JSON content
//----------------------------------------------------------------------------------------------------------------------

function parseJson(relativePath, rawContent) {
    try {
        return JSON.parse(rawContent);
    } catch (error) {
        throw new Error(`Failed to parse ${relativePath}: ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Normalize a tsconfig.json
//----------------------------------------------------------------------------------------------------------------------

function normalizeTsconfig(fileName, json) {
    const compilerOptionsIn = json.compilerOptions;
    const compilerOptionsOut = {};
    Object.keys(compilerOptionsIn)
        .sort()
        .forEach(key => (compilerOptionsOut[key] = normalizeTsconfigValue(compilerOptionsIn[key])));
    const tsNode = 0 <= fileName.indexOf("-esm") ? { "ts-node": { esm: true } } : {};
    return { compilerOptions: compilerOptionsOut, include: ["__SRC_DIR__/**/*.ts", "__SRC_DIR__/**/*.tsx"], ...tsNode };
}

//----------------------------------------------------------------------------------------------------------------------
// Normalize a single config value within the tsconfig.json
//----------------------------------------------------------------------------------------------------------------------

function normalizeTsconfigValue(value) {
    if ("string" === typeof value) {
        if (value.startsWith(`${FRAGMENTS_PATH}__`)) {
            return value.substring(FRAGMENTS_PATH.length);
        } else if (value.startsWith(FRAGMENTS_PATH)) {
            return `../${value.substring(FRAGMENTS_PATH.length)}`;
        }
    }
    return value;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a TypeScript file with all compilations
//----------------------------------------------------------------------------------------------------------------------

function createTsconfigTemplateTs(outputPath, files) {
    const output = {};
    files.forEach(file => (output[file.name] = file.json));
    const content = `export const TSCONFIG_JSON_TEMPLATES = ${JSON.stringify(output, undefined, INDENT)} as const;`;
    writeFileSync(outputPath, content);
}

//----------------------------------------------------------------------------------------------------------------------
// Create this project's tsconfig
//----------------------------------------------------------------------------------------------------------------------

function createTsconfigDefaultJsonFile(outputPath, files, sourceFileName) {
    const matchingFiles = files.filter(file => file.name === sourceFileName);
    if (1 === matchingFiles.length) {
        const stringified = JSON.stringify(matchingFiles[0].json, undefined, INDENT);
        const populated = stringified.replace(/__SRC_DIR__/g, "../src").replace(/__OUT_DIR__/g, "../build");
        writeFileSync(outputPath, populated);
    } else {
        throw new Error(`Failed to create ${outputPath} - source file ${sourceFileName} does not exist `);
    }
}
