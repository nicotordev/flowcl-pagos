type asyncFunction<T> = (...args: unknown[]) => Promise<T>;
/**
 * Wrap an async function so it prepends an error message on exceptions.
 * This helps locate errors.
 */
export declare const addAsyncErrorMessage: <T>(asyncFunc: asyncFunction<T>, message: string) => asyncFunction<T>;
export {};
