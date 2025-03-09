export function shouldDeploy({ buildbotServerSocket }: {
    buildbotServerSocket: any;
}): boolean;
export namespace deploySite {
    export let event: string;
    export { coreStep };
    export let coreStepId: string;
    export let coreStepName: string;
    export function coreStepDescription(): string;
    export { shouldDeploy as condition };
}
declare function coreStep({ buildDir, configPath, repositoryRoot, packagePath, constants, buildbotServerSocket, events, logs, featureFlags, context, branch, configMutations, headersPath, redirectsPath, debug, saveConfig, }: {
    buildDir: any;
    configPath: any;
    repositoryRoot: any;
    packagePath: any;
    constants: any;
    buildbotServerSocket: any;
    events: any;
    logs: any;
    featureFlags: any;
    context: any;
    branch: any;
    configMutations: any;
    headersPath: any;
    redirectsPath: any;
    debug: any;
    saveConfig: any;
}): Promise<{}>;
export {};
