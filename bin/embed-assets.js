import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const [target, ...sources] = process.argv.slice(2);

if (target || sources.length) {
    writeFileSync(join("..", target), assembleFileContents(sources));
} else {
    throw new Error("Missing command line parameters");
}

function assembleFileContents(sources) {
    const variableDeclaration = "export const ASSETS = {\n";
    const variableDeclarationAndProperties = sources.reduce(append, variableDeclaration);
    return `${variableDeclarationAndProperties}} as const;\n`;
}

function append(sourceCode, fileName) {
    const lines = readFileSync(join("..", fileName))
        .toString()
        .replace(/\r/g, "")
        .split("\n")
        .map(line => JSON.stringify(line))
        .map(line => `        ${line},`)
        .join("\n");
    return `${sourceCode}    ${JSON.stringify(fileName)}: [\n${lines}\n    ].join("\\n"),\n`;
}
