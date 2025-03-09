import { includeKeys } from 'filter-obj';
/**
 * Remove falsy values from object
 */
export const removeFalsy = function (obj) {
    return includeKeys(obj, (_key, value) => isTruthy(value));
};
export const removeUndefined = (obj) => includeKeys(obj, (_key, value) => isDefined(value));
export const isTruthy = (value) => isDefined(value) && (typeof value !== 'string' || value.trim() !== '');
export const isDefined = (value) => value !== undefined && value !== null;
