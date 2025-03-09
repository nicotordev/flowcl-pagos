import { FeatureFlags } from '../../feature_flags.js';
import ManifestValidationError from './error.js';
export declare const validateManifest: (manifestData: unknown, _featureFlags?: FeatureFlags) => void;
export { ManifestValidationError };
