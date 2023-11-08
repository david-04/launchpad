export type DefaultEnum = typeof DEFAULT_ENUM;

export const DEFAULT_ENUM = "default";
export const DISABLED_ENUM = "disabled";
export const PINNED_SUFFIX = "::pinned";
export const LAUNCHPAD_ERROR_FILE = "LAUNCHPAD.ERROR";
export const DISABLE_POSTINSTALL_ENV_VARIABLE_NAME = "LAUNCHPAD_DISABLE_POSTINSTALL";

export function defaultMightChange(defaultValue: string) {
    return `currently ${defaultValue}, might change in future uplifts`;
}
