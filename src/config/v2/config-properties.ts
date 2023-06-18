import type { AddError, ConfigFileProperty } from "./config-data-types.js";
import { createProperty, createStringProperty, createVersionProperty } from "./config-descriptor-factories.js";
import { createDirectoryParser, parseProjectName } from "./config-parsers.js";

//----------------------------------------------------------------------------------------------------------------------
// Current configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const CurrentConfigProperties = {
    //------------------------------------------------------------------------------------------------------------------
    // Version number
    //------------------------------------------------------------------------------------------------------------------

    version: createVersionProperty({
        configFile: {
            currentKey: "LP_SETTINGS_VERSION",
            newConfigObjectName: "version",
        },
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Project name
    //------------------------------------------------------------------------------------------------------------------

    projectName: createStringProperty({
        configFile: {
            currentKey: "LP_SETTINGS_PROJECT_NAME",
            newConfigObjectName: "projectName",
        },
        commandLine: {
            option: "--project-name",
            placeholder: "[<NAME> | default]",
            description: "name of the main module",
        },
        parseOldValue: parseProjectName,
        parseNewValue: parseProjectName,
    }),

    //------------------------------------------------------------------------------------------------------------------
    // Artifact
    //------------------------------------------------------------------------------------------------------------------

    artifact: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Runtime
    //------------------------------------------------------------------------------------------------------------------

    runtime: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Module
    //------------------------------------------------------------------------------------------------------------------

    module: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Bundler
    //------------------------------------------------------------------------------------------------------------------

    bundler: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // DTS Bundler
    //------------------------------------------------------------------------------------------------------------------

    dtsBundler: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Formatter
    //------------------------------------------------------------------------------------------------------------------

    formatter: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Package manager
    //------------------------------------------------------------------------------------------------------------------

    packageManager: createProperty(),

    //------------------------------------------------------------------------------------------------------------------
    // Source directory
    //------------------------------------------------------------------------------------------------------------------

    srcDir: createStringProperty({
        configFile: {
            currentKey: "LP_SETTINGS_SRC_DIR",
            newConfigObjectName: "srcDir",
        },
        commandLine: {
            option: "--src-dir",
            placeholder: "<DIR>",
            description: "relative path to the source directory",
        },
        parseOldValue: createDirectoryParser("source directory", "mandatory"),
        parseNewValue: createDirectoryParser("source directory", "mandatory"),
    }),

    //------------------------------------------------------------------------------------------------------------------
    // TSC output directory
    //------------------------------------------------------------------------------------------------------------------

    tscOutDir: createStringProperty({
        configFile: {
            currentKey: "LP_SETTINGS_TSC_OUT_DIR",
            newConfigObjectName: "tscOutDir",
        },
        commandLine: {
            option: "--tsc-out-dir",
            placeholder: "<DIR>",
            description: "TypeScript compiler output directory",
        },
        parseOldValue: createDirectoryParser("TypeScript output directory", "optional"),
        parseNewValue: createDirectoryParser("TypeScript output directory", "optional"),
    }),
} as const;

//----------------------------------------------------------------------------------------------------------------------
// Obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

export const ObsoleteConfigProperties = {} as const;

//----------------------------------------------------------------------------------------------------------------------
// Merge current and obsolete configuration properties
//----------------------------------------------------------------------------------------------------------------------

const AllConfigProperties = { ...CurrentConfigProperties, ...ObsoleteConfigProperties } as const;
const all = Object.keys(AllConfigProperties).map(key => AllConfigProperties[key as keyof typeof AllConfigProperties]);
export const ConfigProperties = { ...AllConfigProperties, all } as const;

//----------------------------------------------------------------------------------------------------------------------
// Parse configuration properties into a
//----------------------------------------------------------------------------------------------------------------------

export function assembleConfig(properties: ReadonlyArray<ConfigFileProperty>, addError: AddError) {
    function parseOldValue(key: keyof typeof CurrentConfigProperties) {
        CurrentConfigProperties[key].parseOldValue(properties, addError);
    }
    return {
        version: parseOldValue("version"),
        projectName: parseOldValue("projectName"),
        artifact: parseOldValue("artifact"),
        runtime: parseOldValue("runtime"),
        module: parseOldValue("module"),
        bundler: parseOldValue("bundler"),
        dtsBundler: parseOldValue("dtsBundler"),
        formatter: parseOldValue("formatter"),
        packageManager: parseOldValue("packageManager"),
        srcDir: parseOldValue("srcDir"),
        tscOutDir: parseOldValue("tscOutDir"),
    } as const satisfies { [K in keyof typeof CurrentConfigProperties]: unknown };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a validated config that has all mandatory properties
//----------------------------------------------------------------------------------------------------------------------

export function validateConfig(config: ReturnType<typeof assembleConfig>, _addError: AddError) {
    try {
        return {
            version: config.version,
            projectName: config.projectName,
            artifact: config.artifact,
            runtime: config.runtime,
            module: config.module,
            bundler: config.bundler,
            dtsBundler: config.dtsBundler,
            formatter: config.formatter,
            packageManager: config.packageManager,
            srcDir: config.srcDir,
            tscOutDir: config.tscOutDir,
        } as const satisfies typeof config;
    } catch (error: unknown) {
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Datatypes
//----------------------------------------------------------------------------------------------------------------------

export type OldPartialConfig = ReturnType<typeof assembleConfig>;
export type OldConfig = ReturnType<typeof validateConfig>;

type NewConfigType<T extends keyof typeof CurrentConfigProperties> = ReturnType<
    (typeof CurrentConfigProperties)[T]["parseNewValue"]
>;

export type NewConfig = {
    version: NewConfigType<"version">;
    projectName: NewConfigType<"artifact">;
    artifact: NewConfigType<"artifact">;
    runtime: NewConfigType<"runtime">;
    module: NewConfigType<"module">;
    bundler: NewConfigType<"bundler">;
    dtsBundler: NewConfigType<"dtsBundler">;
    formatter: NewConfigType<"formatter">;
    packageManager: NewConfigType<"packageManager">;
    srcDir: NewConfigType<"srcDir">;
    tscOutDir: NewConfigType<"tscOutDir">;
};
