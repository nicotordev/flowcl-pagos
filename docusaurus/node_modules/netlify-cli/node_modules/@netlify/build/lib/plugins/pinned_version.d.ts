export function addPinnedVersions({ pluginsOptions, api, siteInfo: { id: siteId }, sendStatus }: {
    pluginsOptions: any;
    api: any;
    siteInfo: {
        id: any;
    };
    sendStatus: any;
}): Promise<any>;
export function pinPlugins({ pluginsOptions, failedPlugins, api, siteInfo: { id: siteId }, childEnv, mode, netlifyConfig, errorMonitor, logs, debug, testOpts, sendStatus, }: {
    pluginsOptions: any;
    failedPlugins: any;
    api: any;
    siteInfo: {
        id: any;
    };
    childEnv: any;
    mode: any;
    netlifyConfig: any;
    errorMonitor: any;
    logs: any;
    debug: any;
    testOpts: any;
    sendStatus: any;
}): Promise<void>;
