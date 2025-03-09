export type ParsedImportMap = import("./types").ParsedImportMap;
export type ParsedScopesMap = {
    [x: string]: Record<string, URL>;
};
export type ParsedSpecifierMap = {
    [x: string]: URL;
};
/**
 * @param {string} specifier
 * @param {ParsedImportMap} parsedImportMap
 * @param {URL} scriptURL
 * @returns {{ resolvedImport: URL | null, matched: boolean }}
 */
export function resolve(specifier: string, parsedImportMap: ParsedImportMap, scriptURL: URL): {
    resolvedImport: URL | null;
    matched: boolean;
};
//# sourceMappingURL=resolver.d.ts.map