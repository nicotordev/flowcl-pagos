/**
 * Load the configuration file and parse it (TOML)
 * @param configPath The path to the toml file
 * @returns
 */
export declare const parseConfig: (configPath?: string) => Promise<any>;
/**
 * Same but `configPath` is required and `configPath` might point to a
 * non-existing file.
 */
export declare const parseOptionalConfig: (configPath: any) => Promise<any>;
