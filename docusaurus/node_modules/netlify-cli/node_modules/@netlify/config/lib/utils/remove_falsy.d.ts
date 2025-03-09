/**
 * Remove falsy values from object
 */
export declare const removeFalsy: (obj: any) => Partial<any>;
type NoUndefinedField<T> = {
    [P in keyof T]: Exclude<T[P], null | undefined>;
};
export declare const removeUndefined: <T extends object>(obj: T) => NoUndefinedField<T>;
export declare const isTruthy: <T>(value: T | false | undefined | null | "" | " ") => value is T;
export declare const isDefined: <T>(value: T | undefined | null) => value is T;
export {};
