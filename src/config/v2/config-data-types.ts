//----------------------------------------------------------------------------------------------------------------------
// Error handling
//----------------------------------------------------------------------------------------------------------------------

export type ConfigError = { error: string };
export type FormatError = (message: string) => string;
export type AddError = (message: string) => void;

//----------------------------------------------------------------------------------------------------------------------
// Key-value pairs imported from the configuration file
//----------------------------------------------------------------------------------------------------------------------

export type ConfigFileProperty = {
    readonly key: string;
    readonly value: string;
    readonly formatError: FormatError;
};

export type ConfigFileProperties = ReadonlyArray<ConfigFileProperty>;

//----------------------------------------------------------------------------------------------------------------------
// Components used to serialize a property into the config file
//----------------------------------------------------------------------------------------------------------------------

export type SerializationDetails = {
    readonly key: string;
    readonly value: string;
    readonly comment: string;
};

//----------------------------------------------------------------------------------------------------------------------
// Components to describe the property's command line parameter
//----------------------------------------------------------------------------------------------------------------------

export type CommandLineInfo = {
    readonly option: string;
    readonly placeholder: string;
    readonly description: string;
};

//----------------------------------------------------------------------------------------------------------------------
// Pinnable enum values
//----------------------------------------------------------------------------------------------------------------------

export type PinnableEnumValue<T> = {
    value: T,
    pinned: boolean
}
