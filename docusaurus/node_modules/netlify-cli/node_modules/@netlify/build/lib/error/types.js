export const isBuildCommandLocation = function (location) {
    const buildLocation = location;
    return typeof buildLocation?.buildCommand === 'string' && typeof buildLocation?.buildCommandOrigin === 'string';
};
export const isFunctionsBundlingLocation = function (location) {
    const bundlingLocation = location;
    return typeof bundlingLocation?.functionName === 'string' && typeof bundlingLocation?.functionType === 'string';
};
export const isCoreStepLocation = function (location) {
    return typeof location?.coreStepName === 'string';
};
export const isPluginLocation = function (location) {
    const pluginLocation = location;
    return (typeof pluginLocation?.event === 'string' &&
        typeof pluginLocation?.packageName === 'string' &&
        typeof pluginLocation?.loadedFrom === 'string');
};
export const isAPILocation = function (location) {
    return typeof location?.endpoint === 'string';
};
export const isDeployLocation = function (location) {
    return typeof location?.statusCode === 'string';
};
const buildErrorAttributePrefix = 'build.error';
const errorLocationToTracingAttributes = function (location) {
    const locationAttributePrefix = `${buildErrorAttributePrefix}.location`;
    if (isBuildCommandLocation(location)) {
        return {
            [`${locationAttributePrefix}.command`]: location.buildCommand,
            [`${locationAttributePrefix}.command_origin`]: location.buildCommandOrigin,
        };
    }
    if (isPluginLocation(location)) {
        return {
            [`${locationAttributePrefix}.plugin.event`]: location.event,
            [`${locationAttributePrefix}.plugin.package_name`]: location.packageName,
            [`${locationAttributePrefix}.plugin.loaded_from`]: location.loadedFrom,
            [`${locationAttributePrefix}.plugin.origin`]: location.origin,
        };
    }
    if (isFunctionsBundlingLocation(location)) {
        return {
            [`${locationAttributePrefix}.function.type`]: location.functionType,
            [`${locationAttributePrefix}.function.name`]: location.functionName,
        };
    }
    if (isCoreStepLocation(location)) {
        return {
            [`${locationAttributePrefix}.core_step.name`]: location.coreStepName,
        };
    }
    if (isAPILocation(location)) {
        return {
            [`${locationAttributePrefix}.api.endpoint`]: location.endpoint,
        };
    }
    if (isDeployLocation(location)) {
        return {
            [`${locationAttributePrefix}.deploy.status_code`]: location.statusCode,
        };
    }
    return {};
};
const pluginDataToTracingAttributes = function (pluginInfo) {
    const pluginAttributePrefix = `${buildErrorAttributePrefix}.plugin`;
    if (typeof pluginInfo === 'undefined')
        return {};
    return {
        [`${pluginAttributePrefix}.name`]: pluginInfo?.packageName,
        [`${pluginAttributePrefix}.version`]: pluginInfo?.pluginPackageJson?.version,
        [`${pluginAttributePrefix}.extensionAuthor`]: pluginInfo?.extensionMetadata?.author,
        [`${pluginAttributePrefix}.extensionSlug`]: pluginInfo?.extensionMetadata?.slug,
    };
};
/**
 * Given a BuildError, extract the relevant trace attributes to add to the on-going Span
 */
export const buildErrorToTracingAttributes = function (error) {
    const attributes = {};
    // Check we're not adding undefined values
    if (error?.severity)
        attributes[`${buildErrorAttributePrefix}.severity`] = error.severity;
    if (error?.type)
        attributes[`${buildErrorAttributePrefix}.type`] = error.type;
    if (error?.locationType)
        attributes[`${buildErrorAttributePrefix}.location.type`] = error.locationType;
    if (error?.stage)
        attributes[`${buildErrorAttributePrefix}.step.id`] = error.stage;
    return {
        ...attributes,
        ...errorLocationToTracingAttributes(error.errorInfo?.location),
        ...pluginDataToTracingAttributes(error.errorInfo?.plugin),
    };
};
/**
 * Retrieve error-type specific information
 */
export const getTypeInfo = function ({ type }) {
    const typeA = TYPES[type] === undefined ? DEFAULT_TYPE : type;
    return { type: typeA, ...TYPES[typeA] };
};
/**
 * List of error types, and their related properties
 * New error types should be added to Bugsnag since we use it for automated
 * monitoring (through its Slack integration). The steps in Bugsnag are:
 *  - Create a new bookmark. Try to re-use the search filter of an existing
 *    bookmark with a similar error type, but only changing the `errorClass`.
 *    Make sure to check the box "Share with my team".
 *  - Add the `errorClass` to the search filter of either the "All warnings" or
 *    "All errors" bookmark depending on whether we should get notified on Slack
 *    for new errors of that type. You must use the bookmark menu action "Update
 *    with current filters"
 *
 */
const TYPES = {
    /**
     * Plugin called `utils.build.cancelBuild()`
     */
    cancelBuild: {
        title: ({ location: { packageName } }) => `Build canceled by ${packageName}`,
        stackType: 'stack',
        locationType: 'buildFail',
        severity: 'none',
    },
    /**
     * User configuration error (`@netlify/config`, wrong Node.js version)
     */
    resolveConfig: {
        title: 'Configuration error',
        stackType: 'none',
        severity: 'info',
    },
    /**
     * Error while installing user packages (missing plugins, local plugins or functions dependencies)
     */
    dependencies: {
        title: 'Dependencies installation error',
        stackType: 'none',
        severity: 'info',
    },
    /**
     * User misconfigured a plugin
     */
    pluginInput: {
        title: ({ location: { packageName, input } }) => `Plugin "${packageName}" invalid input "${input}"`,
        stackType: 'none',
        locationType: 'buildFail',
        severity: 'info',
    },
    /**
     * User package.json sets an unsupported plugin version
     */
    pluginUnsupportedVersion: {
        title: 'Unsupported plugin version detected',
        stackType: 'none',
        severity: 'info',
    },
    /**
     * `build.command` non-0 exit code
     */
    buildCommand: {
        title: '"build.command" failed',
        group: ({ location: { buildCommand } }) => buildCommand,
        stackType: 'message',
        locationType: 'buildCommand',
        severity: 'info',
    },
    /**
     * User error during Functions bundling
     */
    functionsBundling: {
        title: ({ location: { functionName, functionType } }) => {
            if (functionType === 'edge') {
                return 'Bundling of edge function failed';
            }
            return `Bundling of function "${functionName}" failed`;
        },
        group: ({ location: { functionType = 'serverless' } }) => `Bundling of ${functionType} function failed`,
        stackType: 'none',
        locationType: 'functionsBundling',
        severity: 'info',
    },
    /**
     * Error from the secret scanning core step
     */
    secretScanningFoundSecrets: {
        title: 'Secrets scanning detected secrets in files during build.',
        stackType: 'none',
        severity: 'info',
    },
    /**
     * Plugin called `utils.build.failBuild()`
     */
    failBuild: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" failed`,
        stackType: 'stack',
        locationType: 'buildFail',
        severity: 'info',
    },
    /**
     * Plugin called `utils.build.failPlugin()`
     */
    failPlugin: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" failed`,
        stackType: 'stack',
        locationType: 'buildFail',
        severity: 'info',
    },
    /**
     * Plugin has an invalid shape
     */
    pluginValidation: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" internal error`,
        stackType: 'stack',
        locationType: 'buildFail',
        severity: 'warning',
    },
    /**
     * Plugin threw an uncaught exception
     */
    pluginInternal: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" internal error`,
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        locationType: 'buildFail',
        severity: 'warning',
    },
    /**
     * Bug while orchestrating child processes
     */
    ipc: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" internal error`,
        stackType: 'none',
        locationType: 'buildFail',
        severity: 'warning',
    },
    /**
     * Core plugin internal error
     */
    corePlugin: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" internal error`,
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        locationType: 'buildFail',
        severity: 'error',
    },
    /**
     * Trusted plugin internal error (all of our `@netlify/*` plugins).
     */
    trustedPlugin: {
        title: ({ location: { packageName } }) => `Plugin "${packageName}" internal error`,
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        locationType: 'buildFail',
        severity: 'error',
    },
    /**
     * Core step internal error
     */
    coreStep: {
        title: ({ location: { coreStepName } }) => `Internal error during "${coreStepName}"`,
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        locationType: 'coreStep',
        severity: 'error',
    },
    /**
     * Request error when `@netlify/build` was calling Netlify API
     */
    api: {
        title: ({ location: { endpoint } }) => `API error on "${endpoint}"`,
        stackType: 'message',
        showErrorProps: true,
        locationType: 'api',
        severity: 'error',
    },
    /**
     * Non-internal errors deploying files or functions
     */
    deploy: {
        title: 'Error deploying',
        stackType: 'none',
        locationType: 'deploy',
        severity: 'info',
    },
    /**
     * Internal errors deploying files or functions
     */
    deployInternal: {
        title: 'Internal error deploying',
        stackType: 'none',
        locationType: 'deploy',
        severity: 'error',
    },
    /**
     * `@netlify/build` threw an uncaught exception
     */
    exception: {
        title: 'Core internal error',
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        severity: 'error',
    },
    /**
     * Errors related with the telemetry output
     */
    telemetry: {
        showInBuildLog: false,
        title: 'Telemetry error',
        stackType: 'stack',
        showErrorProps: true,
        rawStack: true,
        severity: 'error',
    },
};
// When no error type matches, it's an uncaught exception, i.e. a bug
const DEFAULT_TYPE = 'exception';
