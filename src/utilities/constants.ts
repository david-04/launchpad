export type DefaultEnum = typeof DEFAULT_ENUM;

export const DEFAULT_ENUM = "default";
export const DISABLED_ENUM = "disabled";
export const PINNED_SUFFIX = "::pinned";
export const LAUNCHPAD_ERROR_FILE = "LAUNCHPAD.ERROR";
export const LAUNCHPAD_DISABLE_POSTINSTALL = "LAUNCHPAD_DISABLE_POSTINSTALL";

export const LP_NEW_FILE_EXTENSION = ".LP_NEW";
export const LP_OLD_FILE_EXTENSION = ".LP_OLD";

export function defaultMightChange(defaultValue: string) {
    return `currently ${defaultValue}, might change in future uplifts`;
}
