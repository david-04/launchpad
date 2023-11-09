//----------------------------------------------------------------------------------------------------------------------
// Error handling
//----------------------------------------------------------------------------------------------------------------------

export type ConfigError = { error: string };
export type FormatError = (message: string) => string;
export type AddError = (message: string) => void;

export class ValidationError extends Error {
    public constructor(message: string) {
        super(message);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Key-value pairs extracted from the command line
//----------------------------------------------------------------------------------------------------------------------

export type CommandLineOption = {
    readonly key: string;
    readonly value: string;
}

export type CommandLineOptions = ReadonlyArray<CommandLineOption>;

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
    readonly value: T;
    readonly pinned: boolean;
};

export function pinned<T extends string>(value: T) {
    return { value, pinned: true } as const;
}

export function unpinned<const T>(value: T) {
    return { value, pinned: false } as const;
}
