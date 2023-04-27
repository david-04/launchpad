//----------------------------------------------------------------------------------------------------------------------
// A version number with a major, minor and patch component
//----------------------------------------------------------------------------------------------------------------------

export class Version {
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

    public toString() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Parse a string and create a Version object (or return undefined if the string is not valid)
    //------------------------------------------------------------------------------------------------------------------

    public static of(version: string) {
        const [major, minor, patch, ...other] = version.split(".").map(this.parseNumber);
        if (this.isNumber(major) && this.isNumber(minor) && this.isNumber(patch) && !other.length) {
            return new Version(major, minor, patch);
        } else {
            throw new Error(`Invalid version number format: ${version}`);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Parse a number and return NaN if it's not a number
    //------------------------------------------------------------------------------------------------------------------

    private static parseNumber(value: string) {
        return value.match(/^\d+$/) ? parseInt(value) : NaN;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Verify that the given value is a number (and not NaN)
    //------------------------------------------------------------------------------------------------------------------

    private static isNumber(value?: number): value is number {
        return undefined !== value && !isNaN(value);
    }
}
