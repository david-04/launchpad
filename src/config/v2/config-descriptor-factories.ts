import type {
    AddError,
    CommandLineInfo,
    ConfigError,
    ConfigFileProperties,
    SerializationDetails,
} from "./config-data-types.js";
import { createNonPinnableEnumParser, parseVersion } from "./config-parsers.js";
import type { Version } from "./version-number.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type AssembledDescriptor<OLD, NEW, KEY extends string> = {
    readonly commandLineInfo: undefined | CommandLineInfo;
    readonly matchesConfigFileKey: (key: string) => boolean;
    readonly matchesCommandLineOption: (key: string) => boolean;
    readonly parseOldValue: (properties: ConfigFileProperties, addError: AddError) => OLD | undefined;
    readonly parseNewValue: (value: string) => NEW | ConfigError;
    readonly serialize: (data: Record<KEY, NEW>) => undefined | SerializationDetails;
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
// Temp
//----------------------------------------------------------------------------------------------------------------------

export function createProperty() {
    return {
        matchesConfigFileKey: (_key: string) => true as boolean,
        matchesCommandLineOption: (_key: string) => true as boolean,
        parseOldValue: (_properties: ConfigFileProperties, _addError: AddError) => "",
        parseNewValue: (_value: string) => "",
        serialize: (_data: unknown) => undefined as undefined | SerializationDetails,
        commandLineInfo: undefined as undefined | CommandLineInfo,
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a pinnable enum property descriptor
//----------------------------------------------------------------------------------------------------------------------

export function createPinnableEnumProperty() {}

//----------------------------------------------------------------------------------------------------------------------
// Create a non-pinnable enum property descriptor
//----------------------------------------------------------------------------------------------------------------------

type NonPinnableEnumPropertyDescriptor<KEY extends string, CURRENT extends string, OBSOLETE extends string> = {
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptor;
    readonly currentValues: ReadonlyArray<readonly [CURRENT, string]>;
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
    const descriptor = {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        serialize,
    } as const satisfies AssembledDescriptor<ALL, CURRENT, KEY>;
    return { ...descriptor, options: property.currentValues };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a string property descriptor
//----------------------------------------------------------------------------------------------------------------------

type StringPropertyDescriptor<KEY extends string> = {
    readonly configFile?: ConfigFileDescriptor<KEY>;
    readonly commandLine?: CommandLineDescriptorWithPlaceholder;
    readonly parseOldValue: (value: string) => string | ConfigError;
    readonly parseNewValue: (value: string) => string | ConfigError;
};

export function createStringProperty<KEY extends string>(property: StringPropertyDescriptor<KEY>) {
    const commandLineInfo = createCommandLineInfo(property.commandLine, property.commandLine?.placeholder);
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const matchesCommandLineOption = createCommandLineOptionMatcher(property.commandLine);
    const parseOldValue = createOldValueParser<string>(matchesConfigFileKey, property.parseOldValue);
    const parseNewValue = property.parseNewValue;
    const serialize = createSerializer<string, KEY>(property.configFile, (value: string) => value);
    return {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        serialize,
    } as const satisfies AssembledDescriptor<string, string, KEY>;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a version number property descriptor
//----------------------------------------------------------------------------------------------------------------------

type VersionPropertyDescriptor<KEY extends string> = { readonly configFile: CurrentConfigFileDescriptor<KEY> };

export function createVersionProperty<KEY extends string>(property: VersionPropertyDescriptor<KEY>) {
    const commandLineInfo = undefined;
    const matchesConfigFileKey = createConfigFileKeyMatcher(property.configFile);
    const matchesCommandLineOption = createCommandLineOptionMatcher(undefined);
    const parseOldValue = createOldValueParser<Version>(matchesConfigFileKey, parseVersion);
    const parseNewValue = parseVersion;
    const serialize = createSerializer<Version, KEY>(property.configFile, (value: Version) => value.render());
    return {
        commandLineInfo,
        matchesCommandLineOption,
        matchesConfigFileKey,
        parseOldValue,
        parseNewValue,
        serialize,
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
        const activeKey = "current" in descriptor ? [descriptor.current] : [];
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
    parse: (value: string) => OLD | ConfigError
) {
    return (properties: ConfigFileProperties, addError: AddError) => {
        const property = properties.filter(property => matchesConfigFileKey(property.key)).pop();
        if (property) {
            const value = parse(property.value);
            if (value && "object" === typeof value && "error" in value) {
                addError(value.error);
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
