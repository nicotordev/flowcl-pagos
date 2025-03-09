/**
 * Retrieve the build directory used to resolve most paths.
 * This is (in priority order):
 *  - `build.base`
 *  - `--repositoryRoot`
 *  - the current directory (default value of `--repositoryRoot`)
 */
export declare const getBuildDir: (repositoryRoot: string, base?: string) => Promise<string>;
