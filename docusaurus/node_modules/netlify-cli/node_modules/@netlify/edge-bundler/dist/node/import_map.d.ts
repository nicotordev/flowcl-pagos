import { ParsedImportMap } from '@import-maps/resolve';
import { Logger } from './logger.js';
type Imports = Record<string, string>;
export interface ImportMapFile {
    baseURL: URL;
    imports?: Imports;
    scopes?: Record<string, Imports>;
}
export declare class ImportMap {
    rootPath: string | null;
    sources: ImportMapFile[];
    constructor(sources?: ImportMapFile[], rootPath?: string | null);
    add(source: ImportMapFile): void;
    addFile(path: string, logger: Logger): Promise<void>;
    addFiles(paths: (string | undefined)[], logger: Logger): Promise<void>;
    static applyPrefixesToImports(imports: Imports, prefixes: Record<string, string>): Imports;
    clone(): ImportMap;
    static convertImportsToURLObjects(imports: Imports): Record<string, URL>;
    static convertScopesToURLObjects(scopes: Record<string, Imports>): Record<string, Record<string, URL>>;
    static applyPrefixesToPath(path: string, prefixes: Record<string, string>): string;
    filterImports(imports?: Record<string, URL | null>): Record<string, string>;
    filterScopes(scopes?: ParsedImportMap['scopes']): Record<string, Imports>;
    getContents(prefixes?: Record<string, string>): {
        imports: Imports;
        scopes: {};
    };
    getContentsWithURLObjects(prefixes?: Record<string, string>): {
        imports: Record<string, URL>;
        scopes: Record<string, Record<string, URL>>;
    };
    static readFile(path: string, logger: Logger): Promise<ImportMapFile>;
    resolve(source: ImportMapFile): {
        imports: Record<string, string>;
        scopes: Record<string, Imports>;
    };
    toDataURL(): string;
    writeToFile(path: string): Promise<void>;
}
export {};
