export class Version {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly major: number,
        public readonly minor: number,
        public readonly patch: number
    ) {}

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

export const VERSION_0_0_0 = new Version(0, 0, 0);
export const VERSION_1_0_4 = new Version(1, 0, 4); // NOSONAR
export const VERSION_1_0_5 = new Version(1, 0, 5); // NOSONAR
export const VERSION_1_0_7 = new Version(1, 0, 7); // NOSONAR
