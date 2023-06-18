import type {
    Artifact,
    Bundler,
    DtsBundler,
    Formatter,
    Module,
    PackageManager,
    Runtime,
} from "./properties/enum-property-descriptors.js";
import type { ProjectName, SrcDir, TscOutDir } from "./properties/string-property-descriptors.js";
import type { Version } from "./properties/version-property-descriptor.js";

//----------------------------------------------------------------------------------------------------------------------
// The new target configuration
//----------------------------------------------------------------------------------------------------------------------

export type OldConfig = Readonly<
    Partial<{
        version: Version.OldValue;
        projectName: ProjectName.OldValue;
        artifact: Artifact.OldValue;
        runtime: Runtime.OldValue;
        module: Module.OldValue;
        bundler: Bundler.OldValue;
        dtsBundler: DtsBundler.OldValue;
        formatter: Formatter.OldValue;
        packageManager: PackageManager.OldValue;
        srcDir: SrcDir.OldValue;
        tscOutDir: TscOutDir.OldValue;
    }>
>;
