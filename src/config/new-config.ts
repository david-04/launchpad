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

export interface NewConfig {
    version: Version.NewValue;
    projectName: ProjectName.OldValue;
    artifact: Artifact.NewValue;
    runtime: Runtime.NewValue;
    module: Module.NewValue;
    bundler: Bundler.NewValue;
    dtsBundler: DtsBundler.NewValue;
    formatter: Formatter.NewValue;
    packageManager: PackageManager.NewValue;
    srcDir: SrcDir.NewValue;
    tscOutDir: TscOutDir.NewValue;
}
