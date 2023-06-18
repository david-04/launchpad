import type { Errorless } from "../../../utilities/utility-types.js";
import type { ConfigPropertyDescriptor } from "./property-descriptor.js";
import {
    createMandatoryDirectoryParser,
    createOptionalDirectoryParser,
    createProjectNameParser,
} from "./string-property-utils.js";

//----------------------------------------------------------------------------------------------------------------------
// Project name
//----------------------------------------------------------------------------------------------------------------------

export const ProjectName = {
    configFileKey: "LP_SETTINGS_PROJECT_NAME",
    commandLineParameter: "--project-name",
    promptQuestion: "Project name",
    parseOldValue: createProjectNameParser(
        (error, value) => `Invalid value "${value}" for LP_SETTINGS_PROJECT_NAME (${error})`
    ),
    parseNewValue: createProjectNameParser(error => `The project name ${error}`),
    mandatory: true,
    configFileComment: undefined,
} satisfies ConfigPropertyDescriptor;

export namespace ProjectName {
    export type OldValue = Errorless<ReturnType<(typeof ProjectName)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof ProjectName)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Source directory
//----------------------------------------------------------------------------------------------------------------------

export const SrcDir = {
    configFileKey: "LP_SETTINGS_SRC_DIR",
    commandLineParameter: "--src-dir",
    promptQuestion: "Source directory",
    parseOldValue: createMandatoryDirectoryParser(
        (error, value) => `Invalid value "${value}" for LP_SETTINGS_SRC_DIR (${error})`
    ),
    parseNewValue: createMandatoryDirectoryParser(error => `The source directory ${error}`),
    mandatory: true,
    configFileComment: undefined,
} satisfies ConfigPropertyDescriptor;

export namespace SrcDir {
    export type OldValue = Errorless<ReturnType<(typeof SrcDir)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof SrcDir)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// TypeScript output directory
//----------------------------------------------------------------------------------------------------------------------

export const TscOutDir = {
    configFileKey: "LP_SETTINGS_TSC_OUT_DIR",
    commandLineParameter: "--tsc-out-dir",
    promptQuestion: "TypeScript output directory",
    parseOldValue: createOptionalDirectoryParser(
        (error, value) => `Invalid value "${value}" for LP_SETTINGS_TSC_OUT_DIR (${error})`
    ),
    parseNewValue: createOptionalDirectoryParser(error => `The output directory ${error}`),
    mandatory: true,
    configFileComment: undefined,
} satisfies ConfigPropertyDescriptor;

export namespace TscOutDir {
    export type OldValue = Errorless<ReturnType<(typeof TscOutDir)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof TscOutDir)["parseNewValue"]>>;
}
