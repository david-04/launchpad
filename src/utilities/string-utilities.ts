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
