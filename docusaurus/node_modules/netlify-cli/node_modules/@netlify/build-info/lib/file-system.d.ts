import { Logger } from './logger.js';
export declare const enum Environment {
    Browser = "browser",
    Node = "node"
}
export type DirType = 'directory' | 'file';
export type TextFile = {
    content: string;
    type: 'text';
};
export type JSONFile<T = Record<string, any>> = {
    content: T;
    type: 'json';
};
export type TOMLFile = {
    content: string;
    type: 'toml';
};
export type File = TextFile | JSONFile | TOMLFile;
export type findUpOptions = {
    cwd?: string;
    type?: DirType;
    stopAt?: string;
};
/** A platform independent version of path.normalize()  */
export declare function normalize(path: string): string;
/** A platform independent version of path.join() */
export declare function join(...segments: string[]): string;
export declare abstract class FileSystem {
    logger: Logger;
    /** The current working directory will be set by the project */
    cwd: string;
    abstract getEnvironment(): Environment;
    abstract fileExists(path: string): Promise<boolean>;
    abstract readDir(path: string): Promise<string[]>;
    abstract readDir(path: string, withFileTypes: true): Promise<Record<string, DirType>>;
    abstract readDir(path: string, withFileTypes?: true): Promise<Record<string, DirType> | string[]>;
    abstract readFile(path: string): Promise<string>;
    /** resolves a path to an absolute path */
    abstract resolve(...paths: string[]): string;
    /** check if a path is an absolute path */
    abstract isAbsolute(path: string): boolean;
    /** returns the last portion of a path */
    basename(path: string): string;
    /** returns the relative path from to based on the current working directory */
    relative(from: string, to: string): string;
    /** returns the directory name of a path */
    dirname(path: string): string;
    /** A platform independent version of path.join() */
    join(...segments: string[]): string;
    /** Gracefully reads the file and returns null if it does not exist */
    gracefullyReadFile(path: string): Promise<string | null>;
    /** Gracefully reads a file as JSON and parses it */
    readJSON<V = Record<string, unknown>>(path: string, options?: {
        fail?: boolean;
    }): Promise<Partial<V>>;
    /** Find a file or directory by walking up parent directories. */
    findUp(name: string | readonly string[], options?: findUpOptions): Promise<string | undefined>;
    /** Find files or directories by walking up parent directories. */
    findUpMultiple(name: string | readonly string[], options?: findUpOptions): Promise<string[]>;
}
