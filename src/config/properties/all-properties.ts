import type { NewConfig } from "../new-config.js";
import type { OldConfig } from "../old-config.js";
import {
    Artifact,
    Bundler,
    DtsBundler,
    Formatter,
    Module,
    PackageManager,
    Runtime,
} from "./enum-property-descriptors.js";
import type { ConfigPropertyDescriptor } from "./property-descriptor.js";
import { ProjectName, SrcDir, TscOutDir } from "./string-property-descriptors.js";
import { Version } from "./version-property-descriptor.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type ConfigProperty = ConfigPropertyDescriptor & {
    readonly parseIntoOldConfig: (value: string) => OldConfig | { error: string };
    readonly render: (config: NewConfig) => string;
};

//----------------------------------------------------------------------------------------------------------------------
// All configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const ConfigProperties: ReadonlyArray<ConfigProperty> = [
    {
        ...Version,
        parseIntoOldConfig: createParser(Version.parseOldValue, version => ({ version })),
        render: (config: NewConfig) => config.version.render(),
    },
    {
        ...ProjectName,
        parseIntoOldConfig: createParser(ProjectName.parseOldValue, projectName => ({ projectName })),
        render: (config: NewConfig) => config.projectName,
    },
    {
        ...Artifact,
        parseIntoOldConfig: createParser(Artifact.parseOldValue, artifact => ({ artifact })),
        render: (config: NewConfig) => config.artifact,
    },
    {
        ...Runtime,
        parseIntoOldConfig: createParser(Runtime.parseOldValue, runtime => ({ runtime })),
        render: (config: NewConfig) => config.runtime,
    },
    {
        ...Module,
        parseIntoOldConfig: createParser(Module.parseOldValue, module => ({ module })),
        render: (config: NewConfig) => config.module,
    },
    {
        ...Bundler,
        parseIntoOldConfig: createParser(Bundler.parseOldValue, bundler => ({ bundler })),
        render: (config: NewConfig) => config.bundler.render(),
    },
    {
        ...DtsBundler,
        parseIntoOldConfig: createParser(DtsBundler.parseOldValue, dtsBundler => ({ dtsBundler })),
        render: (config: NewConfig) => config.dtsBundler.render(),
    },
    {
        ...Formatter,
        parseIntoOldConfig: createParser(Formatter.parseOldValue, formatter => ({ formatter })),
        render: (config: NewConfig) => config.formatter.render(),
    },
    {
        ...PackageManager,
        parseIntoOldConfig: createParser(PackageManager.parseOldValue, packageManager => ({ packageManager })),
        render: (config: NewConfig) => config.packageManager.render(),
    },
    {
        ...SrcDir,
        parseIntoOldConfig: createParser(SrcDir.parseOldValue, srcDir => ({ srcDir })),
        render: (config: NewConfig) => config.srcDir,
    },
    {
        ...TscOutDir,
        parseIntoOldConfig: createParser(TscOutDir.parseOldValue, tscOutDir => ({ tscOutDir })),
        render: (config: NewConfig) => config.tscOutDir,
    },
];

//----------------------------------------------------------------------------------------------------------------------
// Create a parser to construct an partial old configuration
//----------------------------------------------------------------------------------------------------------------------

function createParser<T>(parse: (value: string) => T | { error: string }, reduce: (value: T) => OldConfig) {
    return (value: string) => {
        const result = parse(value);
        if (result && result instanceof Object && "error" in result) {
            return result;
        } else {
            return reduce(result);
        }
    };
}
