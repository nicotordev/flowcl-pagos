import { DirType, Environment, FileSystem, findUpOptions } from '../file-system.js';
export declare class NodeFS extends FileSystem {
    constructor();
    getEnvironment(): Environment;
    isAbsolute(path: string): boolean;
    dirname(path: string): string;
    resolve(...paths: string[]): string;
    relative(from: string, to: string): string;
    basename(path: string): string;
    join(...segments: string[]): string;
    fileExists(path: string): Promise<boolean>;
    /** Get a list of directory entries */
    readDir(path: string): Promise<string[]>;
    readDir(path: string, withFileTypes: true): Promise<Record<string, DirType>>;
    readFile(path: string): Promise<string>;
    /** Node implementation of finding a file or directory by walking up parent directories. */
    findUp(name: string | readonly string[], options?: findUpOptions): Promise<string | undefined>;
    /** Node implementation of finding files or directories by walking up parent directories. */
    findUpMultiple(name: string | readonly string[], options?: findUpOptions): Promise<string[]>;
}
