export function updateNetlifyConfig({ configOpts, netlifyConfig, defaultConfig, headersPath, redirectsPath, configMutations, newConfigMutations, configSideFiles, errorParams, logs, systemLog, debug, source, }: {
    configOpts: any;
    netlifyConfig: any;
    defaultConfig: any;
    headersPath: any;
    redirectsPath: any;
    configMutations: any;
    newConfigMutations: any;
    configSideFiles: any;
    errorParams: any;
    logs: any;
    systemLog: any;
    debug: any;
    source?: string | undefined;
}): Promise<{
    netlifyConfig: any;
    configMutations: any;
    headersPath?: undefined;
    redirectsPath?: undefined;
} | {
    netlifyConfig: any;
    configMutations: any[];
    headersPath: any;
    redirectsPath: any;
}>;
export function listConfigSideFiles(sideFiles: any): Promise<string[]>;
