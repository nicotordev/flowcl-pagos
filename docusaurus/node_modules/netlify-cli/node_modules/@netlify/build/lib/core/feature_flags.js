// From CLI `--featureFlags=a,b,c` to programmatic `{ a: true, b: true, c: true }`
export const normalizeCliFeatureFlags = function (cliFeatureFlags) {
    return Object.assign({}, ...cliFeatureFlags.split(',').filter(isNotEmpty).map(getFeatureFlag));
};
const isNotEmpty = function (name) {
    return name.trim() !== '';
};
const getFeatureFlag = function (name) {
    return { [name]: true };
};
// Default values for feature flags
export const DEFAULT_FEATURE_FLAGS = {
    buildbot_zisi_trace_nft: false,
    buildbot_zisi_esbuild_parser: false,
    netlify_build_updated_plugin_compatibility: false,
    netlify_build_plugin_system_log: false,
};
