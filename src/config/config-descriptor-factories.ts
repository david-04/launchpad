import { DEFAULT_ENUM, PINNED_SUFFIX } from "../utilities/constants.js";
import {
    ValidationError,
    type AddError,
    type CommandLineInfo,
    type ConfigError,
    type ConfigFileProperties,
    type PinnableEnumValue,
    type SerializationDetails,
} from "./config-data-types.js";
import { createNonPinnableEnumParser, createPinnableEnumParser, parseVersion } from "./config-parsers.js";
import type { Version } from "./version-number.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type AssembledDescriptor<OLD, NEW, KEY extends string> = {
    readonly commandLineInfo: undefined | CommandLineInfo;
    readonly matchesConfigFileKey: (key: string) => boolean;
    readonly matchesCommandLineOption: (key: string) => boolean;
    readonly parseOldValue: (properties: ConfigFileProperties, addError: AddError) => OLD | undefined;
    readonly parseNewValue: (value: string, source: string) => NEW | ConfigError;
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

//----------------------------------------------------------------------------------------------------------------------
// Non-pinnable enums
//----------------------------------------------------------------------------------------------------------------------

type NonPinnableEnumPropertyDescriptor<KEY extends string, CURRENT extends string, OBSOLETE extends string> = {
    readonly name: string;
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptor;
    readonly currentValues: ReadonlyArray<readonly [CURRENT, string?]>;
    readonly obsoleteValues: ReadonlyArray<OBSOLETE>;
};

export function createNonPinnableEnumProperty<KEY extends string, CURRENT extends string, OBSOLETE extends string>(
    property: NonPinnableEnumPropertyDescriptor<KEY, CURRENT, OBSOLETE>
) {
    type ALL = CURRENT | OBSOLETE;
    const allValues = [...property.currentValues.map(value => value[0]), ...property.obsoleteValues];
    const commandLineInfo = createCommandLineInfo(property.commandLine, `[${property.currentValues.join(" | ")}]`);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const matchesCommandLineOption = createCommandLineOptionMatcher(property.commandLine);
    const parseOldValue = createOldValueParser<ALL>(matchesConfigFileKey, createNonPinnableEnumParser(allValues));
    const parseNewValue = createNonPinnableEnumParser(property.currentValues.map(value => value[0]));
    const serialize = createSerializer<CURRENT, KEY>(property.configFile, (value: CURRENT) => value);
    const assertOldValuePresent = createAssertPresentHandler<KEY, ALL>(property.name, property.configFile);
    const descriptor = {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
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
    readonly currentValues: ReadonlyArray<readonly [CURRENT, string?]>;
    readonly obsoleteValues: ReadonlyArray<OBSOLETE>;
};

export function createPinnableEnumProperty<KEY extends string, CURRENT extends string, OBSOLETE extends string>(
    property: PinnableEnumPropertyDescriptor<KEY, CURRENT, OBSOLETE>
) {
    type ALL = CURRENT | OBSOLETE;
    const allValues = [...property.currentValues.map(value => value[0]), ...property.obsoleteValues];
    const currentValuesWithDefault = [DEFAULT_ENUM, ...property.currentValues];
    const commandLineInfo = createCommandLineInfo(property.commandLine, `[${currentValuesWithDefault.join(" | ")}]`);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const matchesCommandLineOption = createCommandLineOptionMatcher(property.commandLine);
    const parseOldValue = createOldValueParser<PinnableEnumValue<ALL>>(
        matchesConfigFileKey,
        createPinnableEnumParser(allValues)
    );
    const parseNewValue = createPinnableEnumParser(property.currentValues.map(value => value[0]));
    const render = (prop: PinnableEnumValue<CURRENT>) => [prop.value, prop.pinned ? PINNED_SUFFIX : ""].join("");
    const serialize = createSerializer<PinnableEnumValue<CURRENT>, KEY>(property.configFile, render);
    const assertOldValuePresent = createAssertPresentHandler<KEY, PinnableEnumValue<ALL>>(
        property.name,
        property.configFile
    );
    const descriptor = {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
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
    const commandLineInfo = createCommandLineInfo(property.commandLine, property.commandLine?.placeholder);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const matchesCommandLineOption = createCommandLineOptionMatcher(property.commandLine);
    const parseOldValue = createOldValueParser<string>(matchesConfigFileKey, property.parseOldValue);
    const parseNewValue = property.parseNewValue;
    const serialize = createSerializer<string, KEY>(property.configFile, (value: string) => value);
    const assertOldValuePresent = createAssertPresentHandler<KEY, string>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        serialize,
        assertOldValuePresent,
    } as const satisfies AssembledDescriptor<string, string, KEY>;
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
    const matchesCommandLineOption = createCommandLineOptionMatcher(undefined);
    const parseOldValue = createOldValueParser<Version>(matchesConfigFileKey, parseVersion);
    const parseNewValue = parseVersion;
    const serialize = createSerializer<Version, KEY>(property.configFile, (value: Version) => value.render());
    const assertOldValuePresent = createAssertPresentHandler<KEY, Version>(property.name, property.configFile);
    return {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
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
// Create a command line option matcher
//----------------------------------------------------------------------------------------------------------------------

function createCommandLineOptionMatcher(descriptor: CommandLineDescriptor | undefined) {
    return (option: string) => (descriptor ? option === descriptor.option : false);
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
        return (_key: string) => false;
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
