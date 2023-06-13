import {
    Artifact,
    SrcDir,
    type NewConfig,
    TscOutDir,
    Runtime,
    Module,
    Bundler,
    BundlerDts,
    Formatter,
    PackageManager,
} from "./new-config.js";

//----------------------------------------------------------------------------------------------------------------------
// Template configuration data structure
//----------------------------------------------------------------------------------------------------------------------

export type TemplateConfig = Omit<{ [K in keyof NewConfig]: undefined | NewConfig[K] }, "projectName" | "version"> & {
    title: string;
    description: string | undefined;
};

//----------------------------------------------------------------------------------------------------------------------
// Project templates
//----------------------------------------------------------------------------------------------------------------------

const SHARED_PRESETS: Omit<TemplateConfig, "template" | "runtime" | "title" | "description"> = {
    artifact: Artifact.unpinned("app"),
    module: Module.unpinned("esm"),
    bundler: Bundler.unpinned("esbuild"),
    bundlerDts: BundlerDts.unpinned("disabled"),
    formatter: Formatter.unpinned("prettier"),
    packageManager: PackageManager.unpinned("yarn"),
    srcDir: SrcDir.of("src"),
    tscOutDir: TscOutDir.of("build"),
};

export const TemplateConfig = {
    CLI: {
        title: "Node CLI script",
        description: undefined,
        ...SHARED_PRESETS,
        runtime: Runtime.unpinned("node"),
    },
    PREACT: {
        ...SHARED_PRESETS,
        title: "Plain web app",
        description: undefined,
        runtime: Runtime.unpinned("web"),
    },
    WEB: {
        ...SHARED_PRESETS,
        title: "Preact web app",
        description: undefined,
        runtime: Runtime.unpinned("node"),
    },
    CUSTOM: {
        title: "Custom",
        description: "Configure all options individually",
        artifact: undefined,
        runtime: undefined,
        module: undefined,
        bundler: undefined,
        bundlerDts: undefined,
        formatter: undefined,
        packageManager: undefined,
        srcDir: undefined,
        tscOutDir: undefined,
    },
} as const satisfies { [index: string]: TemplateConfig };

export const AllProjectTemplates = [
    TemplateConfig.CLI,
    TemplateConfig.WEB,
    TemplateConfig.PREACT,
    TemplateConfig.CUSTOM,
];
