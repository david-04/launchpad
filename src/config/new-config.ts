import type { Version } from "./version.js";

//----------------------------------------------------------------------------------------------------------------------
// The new target configuration
//----------------------------------------------------------------------------------------------------------------------

export interface NewConfig {
    version: Version;
    artifact: Artifact;
    runtime: Runtime;
    module: Module;
    bundler: Bundler;
    bundlerDts: BundlerDts;
    formatter: Formatter;
    packageManager: PackageManager;
    SrcDir: SrcDir;
    TscOutDir: string;
}

//----------------------------------------------------------------------------------------------------------------------
// Factory classes for configuration properties
//----------------------------------------------------------------------------------------------------------------------

class PropertyFactory<T> {
    protected create(value: T, pinned: boolean, comment?: string) {
        return { comment, value, pinned, stringValue: `${value}`.trim() + (pinned ? "::pinned" : "") } as const;
    }
}

class NonEnumPropertyFactory<T extends Version | string> extends PropertyFactory<T> {
    public of(value: T, comment?: string) {
        return this.create(value, false, comment);
    }
}

class EnumPropertyFactory<T extends string> extends PropertyFactory<T> {
    public constructor(private readonly allowedValues: ReadonlyArray<T>) {
        super();
    }

    public pinned(value: T) {
        return this.create(value, false, this.allowedValues.join(", "));
    }

    public unpinned(value: T) {
        return this.create(value, false, this.allowedValues.join(", "));
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Property factories and types
//----------------------------------------------------------------------------------------------------------------------

export const VersionProperty = new NonEnumPropertyFactory<Version>();
export const Artifact = new EnumPropertyFactory(["app", "lib"] as const);
export const Runtime = new EnumPropertyFactory(["node", "ts-node", "web"] as const);
export const Module = new EnumPropertyFactory(["cjs", "esm"] as const);
export const Bundler = new EnumPropertyFactory(["disabled", "esbuild"] as const);
export const BundlerDts = new EnumPropertyFactory(["disabled", "dts-bundle-generator"] as const);
export const Formatter = new EnumPropertyFactory(["disabled", "prettier", "rome"] as const);
export const PackageManager = new EnumPropertyFactory(["npm", "pnpm", "yarn"] as const);
export const SrcDir = new NonEnumPropertyFactory<string>();
export const TscOutDir = new NonEnumPropertyFactory<string>();

export type VersionProperty = (typeof Version)["of"];
export type Artifact = (typeof Artifact)["pinned"];
export type Runtime = (typeof Runtime)["pinned"];
export type Module = (typeof Module)["pinned"];
export type Bundler = (typeof Bundler)["pinned"];
export type BundlerDts = (typeof BundlerDts)["pinned"];
export type Formatter = (typeof Formatter)["pinned"];
export type PackageManager = (typeof PackageManager)["pinned"];
export type SrcDir = (typeof SrcDir)["of"];
export type TscOutDir = (typeof TscOutDir)["of"];
