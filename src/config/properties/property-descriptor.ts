export type ConfigPropertyDescriptor = {
    readonly configFileKey: string;
    readonly commandLineParameter: string | undefined;
    readonly promptQuestion: string | undefined;
    readonly parseOldValue: (value: string) => unknown;
    readonly parseNewValue: (value: string) => unknown;
    readonly mandatory: boolean;
    readonly configFileComment: string | undefined;
    readonly defaultValue?: unknown;
};
