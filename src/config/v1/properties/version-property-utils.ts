//----------------------------------------------------------------------------------------------------------------------
// Create a parser for the version number
//----------------------------------------------------------------------------------------------------------------------

export function createVersionParser(renderError: (error: string, value: string) => string) {
    return (version: string) => {
        const trimmed = version.trim();
        const [major, minor, patch, ...other] = trimmed.split(".").map(parseNumber);
        if (isNumber(major) && isNumber(minor) && isNumber(patch) && !other.length) {
            return new Version(major, minor, patch);
        } else {
            return { error: renderError(`not a valid version number`, trimmed) };
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Parse a number and return NaN if it's not a number
//----------------------------------------------------------------------------------------------------------------------

function parseNumber(value: string | undefined) {
    const trimmed = value?.trim();
    return trimmed?.match(/^\d+$/) ? parseInt(trimmed) : NaN;
}

//----------------------------------------------------------------------------------------------------------------------
// Verify that the given value is a number (and not NaN)
//----------------------------------------------------------------------------------------------------------------------

function isNumber(value?: number): value is number {
    return undefined !== value && !isNaN(value) && 0 <= value;
}

//----------------------------------------------------------------------------------------------------------------------
// Wrapper class for version values
//----------------------------------------------------------------------------------------------------------------------

class Version {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly major: number, public readonly minor: number, public readonly patch: number) {}

    //------------------------------------------------------------------------------------------------------------------
    // Compare the current version with another one
    //------------------------------------------------------------------------------------------------------------------

    public compareTo(other: Version) {
        return this.major - other.major || this.minor - other.minor || this.patch - other.patch;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Render the full version into a string
    //------------------------------------------------------------------------------------------------------------------

    public render() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}
