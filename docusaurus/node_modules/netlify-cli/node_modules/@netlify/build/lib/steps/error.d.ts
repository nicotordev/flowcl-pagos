import { ErrorTypes } from '../error/types.js';
/**
 * Handle build command errors and plugin errors:
 *  - usually, propagate the error to make the build stop.
 *  - `utils.build.cancelBuild()` also cancels the build by calling the API
 *  - `utils.build.failPlugin()` or post-deploy errors do not make the build
 *    stop, but are still reported, and prevent future events from the same
 *    plugin.
 * This also computes error statuses that are sent to the API.
 */
export declare const handleStepError: ({ event, newError, childEnv, mode, api, errorMonitor, deployId, coreStep, netlifyConfig, logs, debug, testOpts, }: {
    event: any;
    newError: any;
    childEnv: any;
    mode: any;
    api: any;
    errorMonitor: any;
    deployId: any;
    coreStep: any;
    netlifyConfig: any;
    logs: any;
    debug: any;
    testOpts: any;
}) => Promise<{
    failedPlugin: string[];
    newStatus: {
        state: "failed_build" | "failed_plugin" | "canceled_build";
        title: string | (import("../error/types.js").TitleFunction & string);
        summary: string;
        text: string | undefined;
        extraData: any;
    };
}> | Promise<{
    newError: any;
    newStatus: {
        state: "failed_build" | "failed_plugin" | "canceled_build";
        title: string | (import("../error/types.js").TitleFunction & string);
        summary: string;
        text: string | undefined;
        extraData: any;
    };
}> | {
    newError: any;
    newStatus: {
        state: "failed_build" | "failed_plugin" | "canceled_build";
        title: string | (import("../error/types.js").TitleFunction & string);
        summary: string;
        text: string | undefined;
        extraData: any;
    };
} | {
    newError: any;
};
export declare const getPluginErrorType: (error: Error, loadedFrom: string, packageName?: string) => {
    type?: ErrorTypes;
};
