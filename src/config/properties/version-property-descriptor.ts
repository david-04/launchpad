import type { Errorless } from "../../utilities/utility-types.js";
import type { ConfigPropertyDescriptor } from "./property-descriptor.js";
import { createVersionParser } from "./version-property-utils.js";

//----------------------------------------------------------------------------------------------------------------------
// Launchpad version number
//----------------------------------------------------------------------------------------------------------------------

export const Version = {
    configFileKey: "LP_SETTINGS_VERSION",
    commandLineParameter: undefined,
    promptQuestion: undefined,
    parseOldValue: createVersionParser((error, value) => `Invalid value "${value}" for LP_SETTINGS_VERSION (${error})`),
    parseNewValue: createVersionParser((error, value) => `Invalid version number "${value}" (${error})`),
    mandatory: true,
    configFileComment: undefined,
} satisfies ConfigPropertyDescriptor;

export namespace Version {
    export type OldValue = Errorless<ReturnType<(typeof Version)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Version)["parseNewValue"]>>;
}
