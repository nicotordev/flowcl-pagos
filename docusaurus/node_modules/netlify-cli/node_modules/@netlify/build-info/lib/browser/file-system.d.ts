import { DirType, Environment, FileSystem } from '../file-system.js';
/** A sample implementation of a GitHub provider */
export declare class GithubProvider {
    repo: string;
    branch?: string | undefined;
    constructor(repo: string, branch?: string | undefined);
    dir(filePath?: string): Promise<{
        path: string;
        type: 'file' | 'dir';
    }[]>;
    read(filePath: string): Promise<string>;
    private request;
}
/** A sample implementation of a web based file system that fetches from GitHub */
export declare class WebFS extends FileSystem {
    git: GithubProvider;
    constructor(git: GithubProvider);
    getEnvironment(): Environment;
    isAbsolute(path: string): boolean;
    resolve(...paths: string[]): string;
    fileExists(path: string): Promise<boolean>;
    /** Get a list of directory entries */
    readDir(path: string): Promise<string[]>;
    readDir(path: string, withFileTypes: true): Promise<Record<string, DirType>>;
    readFile(path: string): Promise<string>;
}
