import type { File } from "../data/file-cache.js";

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for the package.json file
//----------------------------------------------------------------------------------------------------------------------

export class GitignoreOperations {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly file: File) {}

    //------------------------------------------------------------------------------------------------------------------
    // Check if an entry exists
    //------------------------------------------------------------------------------------------------------------------

    private destructure(line: string) {
        const trimmed = line.trim();
        const isCommentedOut = trimmed.startsWith("#");
        const isNegated = trimmed.match(/^#?\s*!/);
        const glob = trimmed.replace(/^#?\s*!/, "");
        const pattern = `${isNegated ? "!" : ""}${glob}`;
        const normalized = `${isCommentedOut ? "# " : ""}${pattern}`;
        return { original: line, normalized, glob, pattern, isCommentedOut, isNegated };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and setters
    //------------------------------------------------------------------------------------------------------------------

    private get lines(): ReadonlyArray<string> {
        return this.file.lines ?? [];
    }

    private set lines(lines: ReadonlyArray<string>) {
        this.file.lines = lines.length ? lines : undefined;
    }

    public add(pattern: string) {
        const stringifiedLinesBeforeAdd = JSON.stringify(this.lines);
        const normalizedPattern = this.destructure(pattern).normalized;
        this.lines = this.lines
            .map(line => this.destructure(line))
            .map(line => (line.pattern === normalizedPattern && line.isCommentedOut ? line.pattern : line.original));
        if (!this.lines.map(line => this.destructure(line)).some(line => line.normalized === normalizedPattern)) {
            this.lines = [...this.lines, normalizedPattern];
        }
        return stringifiedLinesBeforeAdd === JSON.stringify(this.lines);
    }

    public remove(pattern: string) {
        const stringifiedLinesBeforeRemove = JSON.stringify(this.lines);
        const normalizedPattern = this.destructure(pattern).normalized;
        this.lines = this.lines
            .map(line => this.destructure(line))
            .filter(line => line.normalized !== normalizedPattern)
            .map(line => line.original);
        return stringifiedLinesBeforeRemove === JSON.stringify(this.lines);
    }
}
