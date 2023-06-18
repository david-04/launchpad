import type { Errorless } from "../../../utilities/utility-types.js";
import { createEnum } from "./enum-property-utils.js";

//----------------------------------------------------------------------------------------------------------------------
// Artifact
//----------------------------------------------------------------------------------------------------------------------

export const Artifact = createEnum({
    configFileKey: "LP_SETTINGS_ARTIFACT",
    commandLineParameter: "--artifact",
    promptQuestion: "Artifact",
    currentValues: [
        { value: "app", promptDescription: "a stand-alone application" },
        { value: "lib", promptDescription: "a library with typings" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).nonPinnable("artifact");

export namespace Artifact {
    export type OldValue = Errorless<ReturnType<(typeof Artifact)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Artifact)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Runtime
//----------------------------------------------------------------------------------------------------------------------

export const Runtime = createEnum({
    configFileKey: "LP_SETTINGS_RUNTIME",
    commandLineParameter: "--runtime",
    promptQuestion: "Runtime",
    currentValues: [
        { value: "node", promptDescription: "command line" },
        { value: "ts-node", promptDescription: "command line (without prior compilation)" },
        { value: "web", promptDescription: "browser" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).nonPinnable("runtime");

export namespace Runtime {
    export type OldValue = Errorless<ReturnType<(typeof Runtime)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Runtime)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Module
//----------------------------------------------------------------------------------------------------------------------

export const Module = createEnum({
    configFileKey: "LP_SETTINGS_MODULE",
    commandLineParameter: "--module",
    promptQuestion: "Module",
    currentValues: [
        { value: "cjs", promptDescription: "CommonJS" },
        { value: "esm", promptDescription: "ECMAScript modules" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).nonPinnable("module type");

export namespace Module {
    export type OldValue = Errorless<ReturnType<(typeof Module)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Module)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Bundler
//----------------------------------------------------------------------------------------------------------------------

export const Bundler = createEnum({
    configFileKey: "LP_SETTINGS_BUNDLER",
    commandLineParameter: "--bundler",
    promptQuestion: "Bundler",
    currentValues: [
        { value: "esbuild", promptDescription: undefined },
        { value: "disabled", promptDescription: "don't use bundling" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).pinnableWithDefault("bundler", "esbuild");

export namespace Bundler {
    export type OldValue = Errorless<ReturnType<(typeof Bundler)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Bundler)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// DTS Bundler
//----------------------------------------------------------------------------------------------------------------------

export const DtsBundler = createEnum({
    configFileKey: "LP_SETTINGS_BUNDLER_DTS",
    commandLineParameter: "--dts-bundler",
    promptQuestion: "DTS Bundler",
    currentValues: [
        { value: "dts-bundle-generator", promptDescription: undefined },
        { value: "disabled", promptDescription: "don't use bundling" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).pinnableWithDefault("dts bundler", "dts-bundle-generator");

export namespace DtsBundler {
    export type OldValue = Errorless<ReturnType<(typeof DtsBundler)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof DtsBundler)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Formatter
//----------------------------------------------------------------------------------------------------------------------

export const Formatter = createEnum({
    configFileKey: "LP_SETTINGS_FORMATTER",
    commandLineParameter: "--formatter",
    promptQuestion: "Formatter",
    currentValues: [
        { value: "prettier", promptDescription: undefined },
        { value: "rome", promptDescription: undefined },
        { value: "disabled", promptDescription: "don't format sources" },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).pinnableWithDefault("formatter", "prettier");

export namespace Formatter {
    export type OldValue = Errorless<ReturnType<(typeof Formatter)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof Formatter)["parseNewValue"]>>;
}

//----------------------------------------------------------------------------------------------------------------------
// Package manager
//----------------------------------------------------------------------------------------------------------------------

export const PackageManager = createEnum({
    configFileKey: "LP_SETTINGS_PACKAGE_MANAGER",
    commandLineParameter: "--package-manager",
    promptQuestion: "Package manager",
    currentValues: [
        { value: "npm", promptDescription: undefined },
        { value: "pnpm", promptDescription: undefined },
        { value: "yarn", promptDescription: undefined },
    ] as const,
    obsoleteValues: [] as const,
    mandatory: true,
}).pinnableWithDefault("package manager", "yarn");

export namespace PackageManager {
    export type OldValue = Errorless<ReturnType<(typeof PackageManager)["parseOldValue"]>>;
    export type NewValue = Errorless<ReturnType<(typeof PackageManager)["parseNewValue"]>>;
}
