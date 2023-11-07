export type DefaultEnum = typeof DEFAULT_ENUM;

export const DEFAULT_ENUM = "default";
export const N_A_ENUM = "n/a";
export const DISABLED_ENUM = "disabled";
export const PINNED_SUFFIX = "::pinned";

export function defaultMightChange(defaultValue: string) {
    return `currently ${defaultValue}, might change in future uplifts`;
}
