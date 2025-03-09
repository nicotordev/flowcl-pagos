export function updateConfig(configMutations: any, { buildDir, configPath, headersPath, outputConfigPath, redirectsPath, context, branch, logs, featureFlags, }: {
    buildDir: any;
    configPath: any;
    headersPath: any;
    outputConfigPath?: any;
    redirectsPath: any;
    context: any;
    branch: any;
    logs: any;
    featureFlags: any;
}): Promise<void>;
export function restoreConfig(configMutations: any, { buildDir, configPath, headersPath, redirectsPath }: {
    buildDir: any;
    configPath: any;
    headersPath: any;
    redirectsPath: any;
}): Promise<void>;
