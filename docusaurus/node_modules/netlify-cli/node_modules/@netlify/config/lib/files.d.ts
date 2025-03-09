/**
 * Make configuration paths relative to `buildDir` and converts them to
 * absolute paths
 */
export declare const resolveConfigPaths: (options: {
    config: $TSFixMe;
    repositoryRoot: string;
    buildDir: string;
    baseRelDir?: boolean;
    packagePath?: string;
}) => object;
export declare const resolvePath: (repositoryRoot: string, baseRel: string, originalPath: string, propName: string) => string | undefined;
