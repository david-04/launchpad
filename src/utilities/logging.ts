//----------------------------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------------------------

const MAX_LINE_LENGTH = 120;
const SEPARATOR = new Array(MAX_LINE_LENGTH).fill("-").join("");

//----------------------------------------------------------------------------------------------------------------------
// Generate a separator
//----------------------------------------------------------------------------------------------------------------------

export function createSeparator(title: string) {
    return [SEPARATOR, title, SEPARATOR, ""] as const;
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
