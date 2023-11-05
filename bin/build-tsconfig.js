import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

//----------------------------------------------------------------------------------------------------------------------
// Settings
//----------------------------------------------------------------------------------------------------------------------

const SOURCE_PATH = "resources/tsconfig";
const FRAGMENTS_PATH = "../02-facets/";
const TSCONFIG_TEMPLATES_TS = "src/resources/tsconfig-templates.ts";
const TSCONFIG_DEFAULT_JSON_IN = "tsconfig.cli-application-esm.json";
const TSCONFIG_DEFAULT_JSON_OUT = ".launchpad/tsconfig.default.json";
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
    const normalizedContent = normalizeTsconfig(parsedContent);
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

function normalizeTsconfig(json) {
    const compilerOptionsIn = json.compilerOptions;
    const compilerOptionsOut = {};
    Object.keys(compilerOptionsIn)
        .sort()
        .forEach(key => (compilerOptionsOut[key] = normalizeTsconfigValue(compilerOptionsIn[key])));
    return { compilerOptions: compilerOptionsOut, include: ["../src/**/*.ts"] };
}

//----------------------------------------------------------------------------------------------------------------------
// Normalize a single config value within the tsconfig.json
//----------------------------------------------------------------------------------------------------------------------

function normalizeTsconfigValue(value) {
    if ("string" === typeof value) {
        if (value.startsWith(`${FRAGMENTS_PATH}$`)) {
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
        writeFileSync(outputPath, JSON.stringify(matchingFiles[0].json, undefined, INDENT));
    } else {
        throw new Error(`Failed to create ${outputPath} - source file ${sourceFileName} does not exist `);
    }
}