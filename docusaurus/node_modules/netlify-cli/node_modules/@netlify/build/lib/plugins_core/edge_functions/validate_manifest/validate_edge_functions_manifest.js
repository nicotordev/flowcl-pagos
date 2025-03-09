import { ManifestValidationError, validateManifest } from '@netlify/edge-bundler';
import { tagBundlingError } from '../lib/error.js';
export const validateEdgeFunctionsManifest = async function (manifest, featureFlags) {
    try {
        validateManifest(manifest, featureFlags);
    }
    catch (error) {
        if (error instanceof ManifestValidationError) {
            tagBundlingError(error);
        }
        throw error;
    }
    return {};
};
