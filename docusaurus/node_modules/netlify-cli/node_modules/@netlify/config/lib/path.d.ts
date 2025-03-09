/**
 * Configuration location can be:
 * - a local path with the --config CLI flag
 * - a `netlify.*` file in the `repositoryRoot/{base}/{packagePath}`
 * - a `netlify.*` file in the `repositoryRoot/{base}`
 * - a `netlify.*` file in the `repositoryRoot`
 * - a `netlify.*` file in the current directory or any parent
 */
export declare const getConfigPath: ({ configOpt, cwd, repositoryRoot, configBase, packagePath, }: {
    cwd: string;
    repositoryRoot: string;
    configBase: any;
    configOpt?: string;
    packagePath?: string;
}) => Promise<string | undefined>;
