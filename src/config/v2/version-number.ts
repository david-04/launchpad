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

    public render() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}
