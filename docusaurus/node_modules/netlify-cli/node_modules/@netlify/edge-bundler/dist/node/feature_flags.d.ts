declare const defaultFlags: {};
type FeatureFlag = keyof typeof defaultFlags;
type FeatureFlags = Partial<Record<FeatureFlag, boolean>>;
declare const getFlags: (input?: Record<string, boolean>, flags?: {}) => FeatureFlags;
export { defaultFlags, getFlags };
export type { FeatureFlag, FeatureFlags };
