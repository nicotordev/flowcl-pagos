declare class NPMImportError extends Error {
    constructor(originalError: Error, moduleName: string);
}
declare const wrapNpmImportError: (input: unknown) => unknown;
export { NPMImportError, wrapNpmImportError };
