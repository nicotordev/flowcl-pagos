export namespace saveArtifacts {
    export let event: string;
    export { coreStep };
    export let coreStepId: string;
    export let coreStepName: string;
    export function coreStepDescription(): string;
    export { shouldSaveArtifacts as condition };
}
declare function coreStep({ buildDir, configPath, packagePath, outputConfigPath, repositoryRoot, logs, featureFlags, context, branch, configMutations, headersPath, redirectsPath, debug, saveConfig, }: {
    buildDir: any;
    configPath: any;
    packagePath: any;
    outputConfigPath: any;
    repositoryRoot: any;
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
declare function shouldSaveArtifacts(options: any): boolean;
export {};
