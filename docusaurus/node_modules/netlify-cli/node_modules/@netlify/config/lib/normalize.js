import { normalizeFunctionsProps, WILDCARD_ALL } from './functions_config.js';
import { mergeConfigs } from './merge.js';
import { DEFAULT_ORIGIN } from './origin.js';
import { removeFalsy } from './utils/remove_falsy.js';
/**
 * Normalize configuration object
 */
export const normalizeConfig = function (config, packagePath) {
    const configA = removeEmpty(config);
    const { build, functions, plugins, ...configB } = mergeConfigs([DEFAULT_CONFIG(packagePath), configA]);
    const { build: buildA, functions: functionsA, functionsDirectoryProps } = normalizeFunctionsProps(build, functions);
    const pluginsA = plugins.map(normalizePlugin);
    return { ...configB, build: buildA, functions: functionsA, plugins: pluginsA, ...functionsDirectoryProps };
};
/**
 * Remove empty strings.
 * This notably ensures that empty strings in the build command are removed.
 * Otherwise, those would be run during builds, making the build fail.
 */
const removeEmpty = function ({ build, ...config }) {
    return removeFalsy({ ...config, build: removeFalsy(build) });
};
const DEFAULT_CONFIG = (packagePath) => ({
    build: {
        environment: {},
        publish: packagePath || '.',
        publishOrigin: DEFAULT_ORIGIN,
        processing: { css: {}, html: {}, images: {}, js: {} },
        services: {},
    },
    functions: { [WILDCARD_ALL]: {} },
    plugins: [],
});
const normalizePlugin = function ({ inputs = {}, ...plugin }) {
    return removeFalsy({ ...plugin, inputs });
};
