// If one header fails to parse, we still try to return the other ones
export function splitResults(results) {
    const headers = results.filter((result) => !isError(result));
    const errors = results.filter(isError);
    return { headers, errors };
}
const isError = function (result) {
    return result instanceof Error;
};
// Concatenate an array of `{ headers, errors }`
export const concatResults = function (resultsArrays) {
    const headers = resultsArrays.flatMap(({ headers }) => headers);
    const errors = resultsArrays.flatMap(({ errors }) => errors);
    return { headers, errors };
};
