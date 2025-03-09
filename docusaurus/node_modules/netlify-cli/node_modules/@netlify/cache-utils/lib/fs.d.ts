/**
 * Move or copy a cached file/directory from/to a local one
 * @param src The src directory or file to cache
 * @param dest The destination location
 * @param move If the file should be moved, moving is faster but removes the source files locally
 */
export declare const moveCacheFile: (src: string, dest: string, move?: boolean) => Promise<void | string[]>;
/**
 * Non-existing files and empty directories are always skipped
 */
export declare const hasFiles: (src: string) => Promise<boolean>;
