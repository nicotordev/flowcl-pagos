/**
 * Perform validation and normalization logic to apply to all of:
 *  - config, defaultConfig, inlineConfig
 *  - context-specific configs
 * Therefore, this is performing before merging those together.
 */
export declare const normalizeBeforeConfigMerge: (config: $TSFixMe, origin: any) => any;
/**
 * Validation and normalization logic performed after merging
 */
export declare const normalizeAfterConfigMerge: (config: $TSFixMe, packagePath?: string) => any;
