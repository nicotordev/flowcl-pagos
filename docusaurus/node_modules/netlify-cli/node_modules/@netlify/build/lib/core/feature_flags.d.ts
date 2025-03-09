export type FeatureFlags = Record<string, boolean>;
export declare const normalizeCliFeatureFlags: (cliFeatureFlags: string) => FeatureFlags;
export declare const DEFAULT_FEATURE_FLAGS: FeatureFlags;
