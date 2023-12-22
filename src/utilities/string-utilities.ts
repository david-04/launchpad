//----------------------------------------------------------------------------------------------------------------------
// Reformat file content with a different tab size
//----------------------------------------------------------------------------------------------------------------------

import { MAX_LINE_LENGTH } from "./constants.js";

export function adjustTabSize(contents: string, originalTabSize: number, newTabSize: number) {
    const regExp = new RegExp(`^(\t*) {${originalTabSize}}`, "g");
    const newIndent = " ".repeat(newTabSize);
    return contents
        .split("\n")
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replace(regExp, "$1\t"))
        .map(line => line.replaceAll("\t", newIndent))
        .join("\n");
}

//----------------------------------------------------------------------------------------------------------------------
// Break long lines
//----------------------------------------------------------------------------------------------------------------------

export function breakLines(lines: ReadonlyArray<string>) {
    return lines.flatMap(breakLine);
}

export function breakLine(line: string) {
    line = line.trim();
    const isListItem = line.startsWith("- ");
    const lines = new Array<string>();
    while (MAX_LINE_LENGTH < line.length) {
        let index = line.substring(0, MAX_LINE_LENGTH).lastIndexOf(" ");
        index = 0 < index ? index : MAX_LINE_LENGTH;
        lines.push(line.substring(0, index));
        line = line.substring(index + 1).trim();
        line = (isListItem && line ? "  " : "") + line;
    }
    if (line || !lines.length) {
        lines.push(line);
    }
    return lines as ReadonlyArray<string>;
}
