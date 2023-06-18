import { Version } from "../config/v1/properties/version-property-descriptor.js";

//----------------------------------------------------------------------------------------------------------------------
// Version information
//----------------------------------------------------------------------------------------------------------------------

export const VERSION_NUMBER_STRING = "0.0.0";
export const COPYRIGHT_YEARS = "2023";
export const VERSION_NUMBER = parseVersion(VERSION_NUMBER_STRING);

//----------------------------------------------------------------------------------------------------------------------
// Parse and validate the version number
//----------------------------------------------------------------------------------------------------------------------

function parseVersion(version: string) {
    const result = Version.parseNewValue(version);
    if ("error" in result) {
        throw new Error(`INTERNAL ERROR: Invalid version number: ${version} (${result.error})`);
    } else {
        return result;
    }
}
