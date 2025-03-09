const defaultFlags = {};
const getFlags = (input = {}, flags = defaultFlags) => Object.entries(flags).reduce((result, [key, defaultValue]) => ({
    ...result,
    [key]: input[key] === undefined ? defaultValue : input[key],
}), {});
export { defaultFlags, getFlags };
