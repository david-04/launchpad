//----------------------------------------------------------------------------------------------------------------------
// Create a project name parser
//----------------------------------------------------------------------------------------------------------------------

export function createProjectNameParser(renderError: (error: string, value: string) => string) {
    return (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) {
            return { error: renderError("must not be empty", trimmed) };
        } else if (!trimmed.match(/^[^*?:<>#\s\\/]+$/)) {
            return {
                error: renderError("must be a valid file name and not contain blanks or special characters", trimmed),
            };
        } else {
            return trimmed;
        }
    };
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for a mandatory directory
//----------------------------------------------------------------------------------------------------------------------

export function createMandatoryDirectoryParser(renderError: (error: string, value: string) => string) {
    return createDirectoryParser(true, renderError);
}

//----------------------------------------------------------------------------------------------------------------------
// Create a parser for an optional directory
//----------------------------------------------------------------------------------------------------------------------

export function createOptionalDirectoryParser(renderError: (error: string, value: string) => string) {
    return createDirectoryParser(false, renderError);
}

//----------------------------------------------------------------------------------------------------------------------
// Create a directory parser
//----------------------------------------------------------------------------------------------------------------------

function createDirectoryParser(mandatory: boolean, renderError: (error: string, value: string) => string) {
    return (path: string) => {
        const trimmed = path.trim();
        const normalized = trimmed.replace(/\\/g, "/").replace(/^\.\//g, "").replace(/\/+$/, "");
        if (mandatory && !normalized) {
            return { error: renderError("must not be empty", trimmed) };
        } else if (normalized.match(/^([a-z]:|\/)/)) {
            return { error: renderError("must be a relative (and not an absolute) path", trimmed) };
        } else if (!normalized.match(/^[^*?:<>#\s]+$/)) {
            return { error: renderError("must not contain blanks or special characters", trimmed) };
        } else {
            return normalized;
        }
    };
}
