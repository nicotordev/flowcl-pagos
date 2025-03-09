import { excludeKeys } from 'filter-obj';
// lodash.omit is 1400 lines of codes. filter-obj is much smaller and simpler.
export const omit = (obj, keys) => excludeKeys(obj, (key) => keys.includes(key));
