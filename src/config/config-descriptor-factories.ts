import { DEFAULT_ENUM, PINNED_SUFFIX } from "../utilities/constants.js";
import { fail } from "../utilities/fail.js";
import {
    ValidationError,
    type AddError,
    type CommandLineInfo,
    type CommandLineOptions,
    type ConfigError,
    type ConfigFileProperties,
    type PinnableEnumValue,
    type SerializationDetails,
} from "./config-data-types.js";
import {
    createIntegerParser,
    createNonPinnableEnumParser,
    createPinnableEnumParser,
    parseBoolean,
    parseVersion,
} from "./config-parsers.js";
import type { Version } from "./version-number.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type AssembledDescriptor<OLD, NEW, KEY extends string> = {
    readonly commandLineInfo: undefined | CommandLineInfo;
    readonly matchesConfigFileKey: (key: string) => boolean;
    readonly parseOldValue: (properties: ConfigFileProperties, addError: AddError) => OLD | undefined;
    readonly parseNewValue: (value: string, source: string) => NEW | ConfigError;
    readonly parseFromCommandLine: (options: CommandLineOptions) => NEW | undefined | typeof DEFAULT_ENUM;
    readonly serialize: (data: Record<KEY, NEW>) => undefined | SerializationDetails;
    readonly assertOldValuePresent: (value: OLD | undefined) => Exclude<OLD, undefined>;
};

type CurrentConfigFileDescriptor<KEY extends string> = {
    readonly currentKey: string;
    readonly obsoleteKeys?: ReadonlyArray<string>;
    readonly comment?: string;
    readonly newConfigObjectName: KEY;
};

type ObsoleteConfigFileDescriptor = { obsoleteKeys: ReadonlyArray<string> };
type ConfigFileDescriptor<KEY extends string> = CurrentConfigFileDescriptor<KEY> | ObsoleteConfigFileDescriptor;

type CommandLineDescriptor = {
    readonly option: string;
    readonly description: string;
};

type CommandLineDescriptorWithPlaceholder = CommandLineDescriptor & { readonly placeholder: string };
type CommandLineDescriptorWithOptionalPlaceholder = CommandLineDescriptor & { readonly placeholder?: string };

//----------------------------------------------------------------------------------------------------------------------
// Non-pinnable enums
//----------------------------------------------------------------------------------------------------------------------

type NonPinnableEnumPropertyDescriptor<KEY extends string, CURRENT extends string, OBSOLETE extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithOptionalPlaceholder;
    readonly currentValues: ReadonlyArray<readonly [CURRENT, string?]>;
    readonly obsoleteValues: ReadonlyArray<OBSOLETE>;
};

export function createNonPinnableEnumProperty<KEY extends string, CURRENT extends string, OBSOLETE extends string>(
    property: NonPinnableEnumPropertyDescriptor<KEY, CURRENT, OBSOLETE>
) {
    type ALL = CURRENT | OBSOLETE;
    const currentValues = property.currentValues.map(value => value[0]);
    const allValues = [...currentValues, ...property.obsoleteValues];
    const currentValuesWithDefault = [DEFAULT_ENUM, ...currentValues];
    const commandLineInfo = createCommandLineInfo(
        property.commandLine,
        property.commandLine?.placeholder ?? `[${currentValuesWithDefault.join(" | ")}]`
    );
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<ALL>(matchesConfigFileKey, createNonPinnableEnumParser(allValues));
    const parseNewValue = createNonPinnableEnumParser(currentValues);
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const serialize = createSerializer<CURRENT, KEY>(property.configFile, (value: CURRENT) => value);
    const assertOldValuePresent = createAssertPresentHandler<KEY, ALL>(property.name, property.configFile);
    const descriptor = {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<ALL, CURRENT, KEY>;
    return { ...descriptor, options: property.currentValues };
}

//----------------------------------------------------------------------------------------------------------------------
// Pinnable enums
//----------------------------------------------------------------------------------------------------------------------

type PinnableEnumPropertyDescriptor<KEY extends string, CURRENT extends string, OBSOLETE extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptor;
    readonly currentValues: ReadonlyArray<readonly [CURRENT, string | undefined]>;
    readonly obsoleteValues: ReadonlyArray<OBSOLETE>;
};

export function createPinnableEnumProperty<KEY extends string, CURRENT extends string, OBSOLETE extends string>(
    property: PinnableEnumPropertyDescriptor<KEY, CURRENT, OBSOLETE>
) {
    type ALL = CURRENT | OBSOLETE;
    const currentValues = property.currentValues.map(value => value[0]);
    const allValues = [...currentValues, ...property.obsoleteValues];
    const currentValuesWithDefault = [DEFAULT_ENUM, ...currentValues];
    const commandLineInfo = createCommandLineInfo(property.commandLine, `[${currentValuesWithDefault.join(" | ")}]`);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<PinnableEnumValue<ALL>>(
        matchesConfigFileKey,
        createPinnableEnumParser(allValues)
    );
    const parseNewValue = createPinnableEnumParser(currentValues);
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const render = (prop: PinnableEnumValue<CURRENT>) => [prop.value, prop.pinned ? PINNED_SUFFIX : ""].join("");
    const serialize = createSerializer<PinnableEnumValue<CURRENT>, KEY>(property.configFile, render);
    const assertOldValuePresent = createAssertPresentHandler<KEY, PinnableEnumValue<ALL>>(
        property.name,
        property.configFile
    );
    const descriptor = {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<PinnableEnumValue<ALL>, PinnableEnumValue<CURRENT>, KEY>;
    return { ...descriptor, options: property.currentValues };
}

//----------------------------------------------------------------------------------------------------------------------
// String properties
//----------------------------------------------------------------------------------------------------------------------

type StringPropertyDescriptor<KEY extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithPlaceholder;
    readonly parseOldValue: (value: string, source: string | undefined) => string | ConfigError;
    readonly parseNewValue: (value: string, source: string | undefined) => string | ConfigError;
};

export function createStringProperty<KEY extends string>(property: StringPropertyDescriptor<KEY>) {
    const placeholder = property.commandLine ? `[${property.commandLine?.placeholder} | default]` : undefined;
    const commandLineInfo = createCommandLineInfo(property.commandLine, placeholder);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<string>(matchesConfigFileKey, property.parseOldValue);
    const parseNewValue = property.parseNewValue;
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const serialize = createSerializer<string, KEY>(property.configFile, (value: string) => value);
    const assertOldValuePresent = createAssertPresentHandler<KEY, string>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<string, string, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// String-array properties
//----------------------------------------------------------------------------------------------------------------------

type StringArrayPropertyDescriptor<KEY extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithPlaceholder;
    readonly parseOldValue: (value: string, source: string | undefined) => ReadonlyArray<string> | ConfigError;
    readonly parseNewValue: (value: string, source: string | undefined) => ReadonlyArray<string> | ConfigError;
};

export function createStringArrayProperty<KEY extends string>(property: StringArrayPropertyDescriptor<KEY>) {
    const placeholder = property.commandLine ? `[${property.commandLine?.placeholder}]` : undefined;
    const commandLineInfo = createCommandLineInfo(property.commandLine, placeholder);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<ReadonlyArray<string>>(matchesConfigFileKey, property.parseOldValue);
    const parseNewValue = property.parseNewValue;
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const serialize = createSerializer<ReadonlyArray<string>, KEY>(
        property.configFile,
        (value: ReadonlyArray<string>) => Array.from(value).join(",")
    );
    const assertOldValuePresent = createAssertPresentHandler<KEY, ReadonlyArray<string>>(
        property.name,
        property.configFile
    );
    return {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<ReadonlyArray<string>, ReadonlyArray<string>, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// Boolean
//----------------------------------------------------------------------------------------------------------------------

type BooleanPropertyDescriptor<KEY extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithPlaceholder;
};

export function createBooleanProperty<KEY extends string>(property: BooleanPropertyDescriptor<KEY>) {
    const commandLineInfo = property.commandLine;
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<boolean>(matchesConfigFileKey, parseBoolean);
    const parseNewValue = parseBoolean;
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const serialize = createSerializer<boolean, KEY>(property.configFile, (value: boolean) => value ? "true" : "false");
    const assertOldValuePresent = createAssertPresentHandler<KEY, boolean>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<boolean, boolean, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// Number
//----------------------------------------------------------------------------------------------------------------------

type IntegerPropertyDescriptor<KEY extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithPlaceholder;
    readonly range: {min: number, max: number};
};

export function createIntegerProperty<KEY extends string>(property: IntegerPropertyDescriptor<KEY>) {
    const commandLineInfo = property.commandLine;
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const numberParser = createIntegerParser(property.name, property.range.min, property.range.max);
    const parseOldValue = createOldValueParser<number>(matchesConfigFileKey, numberParser);
    const parseNewValue = numberParser;
    const parseFromCommandLine = createCommandLineParser(property.commandLine, parseNewValue);
    const serialize = createSerializer<number, KEY>(property.configFile, (value: number) => `${value}`);
    const assertOldValuePresent = createAssertPresentHandler<KEY, number>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<number, number, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// Version number
//----------------------------------------------------------------------------------------------------------------------

type VersionPropertyDescriptor<KEY extends string> = {
    readonly name: string;
    readonly configFile: CurrentConfigFileDescriptor<KEY>;
};

export function createVersionProperty<KEY extends string>(property: VersionPropertyDescriptor<KEY>) {
    const commandLineInfo = undefined;
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const parseOldValue = createOldValueParser<Version>(matchesConfigFileKey, parseVersion);
    const parseNewValue = parseVersion;
    const parseFromCommandLine = createCommandLineParser(undefined, parseNewValue);
    const serialize = createSerializer<Version, KEY>(property.configFile, (value: Version) => value.render());
    const assertOldValuePresent = createAssertPresentHandler<KEY, Version>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        parseFromCommandLine,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<Version, Version, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a command-line info object
//----------------------------------------------------------------------------------------------------------------------

function createCommandLineInfo(descriptor: CommandLineDescriptor | undefined, placeholder: string | undefined) {
    if (descriptor) {
        return { ...descriptor, placeholder: placeholder } as CommandLineInfo;
    } else {
        return undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a config file key matcher
//----------------------------------------------------------------------------------------------------------------------

function createConfigFileKeyMatcher<KEY extends string>(descriptor: ConfigFileDescriptor<KEY> | undefined) {
    if (descriptor) {
        const name: keyof CurrentConfigFileDescriptor<KEY> = "currentKey";
        const activeKey = name in descriptor ? [descriptor[name]] : [];
        const allKeys = [...activeKey, ...(descriptor.obsoleteKeys ?? [])];
        return (key: string) => allKeys.some(currentKey => currentKey === key);
    } else {
        return () => false;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for old config values
//----------------------------------------------------------------------------------------------------------------------

function createOldValueParser<OLD>(
    matchesConfigFileKey: (key: string) => boolean,
    parse: (value: string, source: string | undefined) => OLD | ConfigError
) {
    return (properties: ConfigFileProperties, addError: AddError) => {
        const property = properties.filter(property => matchesConfigFileKey(property.key)).pop();
        if (property) {
            const value = parse(property.value, property.key);
            if (value && "object" === typeof value && "error" in value) {
                addError(property.formatError(value.error));
            } else {
                return value;
            }
        }
        return undefined;
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a config file serializer
//----------------------------------------------------------------------------------------------------------------------

function createSerializer<NEW, KEY extends string>(
    descriptor: ConfigFileDescriptor<KEY> | undefined,
    render: (value: NEW) => string
) {
    return (data: Record<KEY, NEW>) => {
        if (descriptor && "currentKey" in descriptor && "newConfigObjectName" in descriptor) {
            const key = descriptor.currentKey;
            const value = render(data[descriptor.newConfigObjectName]);
            const comment = descriptor.comment ?? "";
            return { key, value, comment } as const;
        } else {
            return undefined;
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a reference to a config file
//----------------------------------------------------------------------------------------------------------------------

function createAssertPresentHandler<KEY extends string, OLD>(
    propertyName: string,
    configFileDescriptor: ConfigFileDescriptor<KEY> | undefined
) {
    return (value: OLD | undefined) => {
        if (undefined === value) {
            if (configFileDescriptor && "currentKey" in configFileDescriptor) {
                throw new ValidationError(`Config property ${configFileDescriptor.currentKey} is missing`);
            } else {
                throw new ValidationError(`The ${propertyName} is missing`);
            }
        }
        return value as Exclude<OLD, undefined>;
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a command line parser for a given option
//----------------------------------------------------------------------------------------------------------------------

function createCommandLineParser<T>(
    commandLineDescriptor: CommandLineDescriptor | undefined,
    parse: (value: string, source: string | undefined) => T | { readonly error: string }
): (options: CommandLineOptions) => Exclude<T, ConfigError> | undefined | typeof DEFAULT_ENUM {
    return (options: CommandLineOptions) => {
        for (let index = options.length - 1; 0 <= index; index--) {
            const option = options[index]!;
            if (option.key === commandLineDescriptor?.option) {
                if (DEFAULT_ENUM === option.value) {
                    return DEFAULT_ENUM;
                } else {
                    const value = parse(option.value, `command line option ${option.key}`);
                    if (value && "object" === typeof value && "error" in value) {
                        fail(value.error);
                    } else {
                        return value as Exclude<T, ConfigError>;
                    }
                }
            }
        }
        return undefined;
    };
}
