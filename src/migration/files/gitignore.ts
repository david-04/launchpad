import type { File } from "../data/file";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

interface DestructuredLine {
    readonly original: string;
    readonly normalized: string;
    readonly glob: string;
    readonly pattern: string;
    readonly isCommentedOut: boolean;
    readonly isNegated: boolean;
}

//----------------------------------------------------------------------------------------------------------------------
// Wrapper for the package.json file
//----------------------------------------------------------------------------------------------------------------------

export class GitignoreOperations {
    private static readonly CACHE = new Map<string, DestructuredLine>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly file: File) {}

    //------------------------------------------------------------------------------------------------------------------
    // Getters and setters
    //------------------------------------------------------------------------------------------------------------------

    private get lines(): ReadonlyArray<string> {
        return this.file.lines ?? [];
    }

    private set lines(lines: ReadonlyArray<string>) {
        this.file.lines = lines.length ? lines : undefined;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Destructure/normalize a pattern
    //------------------------------------------------------------------------------------------------------------------

    private destructure(line: string) {
        if (GitignoreOperations.CACHE.has(line)) {
            return GitignoreOperations.CACHE.get(line)!;
        }
        const trimmed = line.trim();
        const isCommentedOut = trimmed.startsWith("#");
        const isNegated = !!trimmed.match(/^#?\s*!/);
        const glob = trimmed.replace(/^#?\s*!/, "");
        const pattern = `${isNegated ? "!" : ""}${glob}`;
        const normalized = `${isCommentedOut ? "# " : ""}${pattern}`;
        const result = { original: line, normalized, glob, pattern, isCommentedOut, isNegated } as const;
        GitignoreOperations.CACHE.set(line, result);
        return result;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if a pattern exists
    //------------------------------------------------------------------------------------------------------------------

    public containsActiveOrCommentedOut(pattern: string) {
        return this.containsActive(pattern) || this.containsCommentedOut(pattern);
    }

    public containsCommentedOut(pattern: string) {
        return this.lines.some(line => this.matches(line, "commented-out", pattern));
    }

    public containsActive(pattern: string) {
        return this.lines.some(line => this.matches(line, "active", pattern));
    }

    private matches(line: string, type: "active" | "commented-out", pattern: string) {
        const normalizedLine = this.destructure(line);
        return (
            normalizedLine.isCommentedOut === (type === "commented-out") &&
            normalizedLine.normalized === this.destructure(pattern).normalized
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add and remove patterns
    //------------------------------------------------------------------------------------------------------------------

    public add(pattern: string) {
        if (!this.containsActive(pattern)) {
            this.lines = [...this.lines, this.destructure(pattern).normalized];
        }
    }

    public remove(pattern: string) {
        this.lines = this.lines.filter(line => !this.matches(line, "active", pattern));
    }
}
