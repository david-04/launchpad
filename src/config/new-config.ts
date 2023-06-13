import type { Version } from "./version.js";

//----------------------------------------------------------------------------------------------------------------------
// The new target configuration
//----------------------------------------------------------------------------------------------------------------------

export interface NewConfig {
    projectName: ProjectName;
    version: VersionProperty;
    artifact: Artifact;
    runtime: Runtime;
    module: Module;
    bundler: Bundler;
    bundlerDts: BundlerDts;
    formatter: Formatter;
    packageManager: PackageManager;
    srcDir: SrcDir;
    tscOutDir: TscOutDir;
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

export const ProjectName = new NonEnumPropertyFactory<string>();
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

export type ProjectName = ReturnType<(typeof ProjectName)["of"]>;
export type VersionProperty = ReturnType<(typeof VersionProperty)["of"]>;
export type Artifact = ReturnType<(typeof Artifact)["pinned"]>;
export type Runtime = ReturnType<(typeof Runtime)["pinned"]>;
export type Module = ReturnType<(typeof Module)["pinned"]>;
export type Bundler = ReturnType<(typeof Bundler)["pinned"]>;
export type BundlerDts = ReturnType<(typeof BundlerDts)["pinned"]>;
export type Formatter = ReturnType<(typeof Formatter)["pinned"]>;
export type PackageManager = ReturnType<(typeof PackageManager)["pinned"]>;
export type SrcDir = ReturnType<(typeof SrcDir)["of"]>;
export type TscOutDir = ReturnType<(typeof TscOutDir)["of"]>;

//----------------------------------------------------------------------------------------------------------------------
// Create a selector to extract new config properties
//----------------------------------------------------------------------------------------------------------------------

export function createExtractor(extract: (config: NewConfig) => { stringValue: string; comment: string | undefined }) {
    return (config: NewConfig) => {
        const property = extract(config);
        return { value: property.stringValue, comment: property.comment };
    };
}
