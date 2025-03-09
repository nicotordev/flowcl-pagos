export type ImportMap = import("./types").ImportMap;
export type ScopesMap = {
    [x: string]: Record<string, string>;
};
export type SpecifierMap = {
    [x: string]: string;
};
export type ParsedImportMap = import("./types").ParsedImportMap;
export type ParsedScopesMap = {
    [x: string]: Record<string, URL>;
};
export type ParsedSpecifierMap = {
    [x: string]: URL;
};
/**
 * @param {ImportMap} input
 * @param {URL} baseURL
 * @returns {ParsedImportMap}
 */
export function parse(input: ImportMap, baseURL: URL): ParsedImportMap;
/**
 * @param {string} input
 * @param {URL} baseURL
 * @returns {ParsedImportMap}
 */
export function parseFromString(input: string, baseURL: URL): ParsedImportMap;
//# sourceMappingURL=parser.d.ts.map