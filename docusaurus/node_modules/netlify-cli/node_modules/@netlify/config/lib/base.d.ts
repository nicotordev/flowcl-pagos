/**
 * Retrieve the first `base` directory used to load the first config file.
 */
export declare const getInitialBase: ({ repositoryRoot, defaultConfig: { build: { base: defaultBase } }, inlineConfig: { build: { base: initialBase } }, }: {
    repositoryRoot: any;
    defaultConfig: {
        build?: {} | undefined;
    };
    inlineConfig: {
        build?: {
            base?: any;
        } | undefined;
    };
}) => string | undefined;
/**
 * Two config files can be used:
 *  - The first one, using the `config` property or doing a default lookup
 *    of `netlify.toml`
 *  - If the first one has a `base` property pointing to a directory with
 *    another `netlify.toml`, that second config file is used instead.
 * This retrieves the final `base` directory used:
 *  - To load the second config file
 *  - As the `buildDir`
 *  - To resolve file paths
 * If the second file has a `base` property, it is ignored, i.e. it is not
 * recursive.
 */
export declare const getBase: (base: string | undefined, repositoryRoot: string, config: $TSFixMe) => string | undefined;
/**
 * Also `config.build.base`.
 */
export declare const addBase: (config: any, base: any) => any;
