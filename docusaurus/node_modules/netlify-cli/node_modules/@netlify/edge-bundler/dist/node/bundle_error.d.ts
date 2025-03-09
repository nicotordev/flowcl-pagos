interface BundleErrorOptions {
    format: string;
}
declare const getCustomErrorInfo: (options?: BundleErrorOptions) => {
    location: {
        format: string | undefined;
        runtime: string;
    };
    type: string;
};
declare class BundleError extends Error {
    customErrorInfo: ReturnType<typeof getCustomErrorInfo>;
    constructor(originalError: Error, options?: BundleErrorOptions);
}
/**
 * BundleErrors are treated as user-error, so Netlify Team is not alerted about them.
 */
declare const wrapBundleError: (input: unknown, options?: BundleErrorOptions) => unknown;
export { BundleError, wrapBundleError };
