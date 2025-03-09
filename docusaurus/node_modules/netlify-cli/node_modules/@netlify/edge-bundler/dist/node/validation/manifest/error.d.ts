export default class ManifestValidationError extends Error {
    customErrorInfo: {
        type: string;
    };
    constructor(message: string | undefined);
}
