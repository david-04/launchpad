//----------------------------------------------------------------------------------------------------------------------
// An exception that doesn't require a stack trace.
//----------------------------------------------------------------------------------------------------------------------

class FriendlyError extends Error {
    public constructor(message: string) {
        super(message);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Fail with the specified error message
//----------------------------------------------------------------------------------------------------------------------

export function fail(message: string): never {
    throw new FriendlyError(`ERROR: ${message}`);
}

//----------------------------------------------------------------------------------------------------------------------
// Get the error message
//----------------------------------------------------------------------------------------------------------------------

export function formatError(error?: unknown) {
    if (error instanceof FriendlyError) {
        return error.message;
    } else if (error instanceof Error) {
        return error;
    } else {
        return `Unknown error: ${error}`;
    }
}
