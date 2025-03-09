export namespace buildCommandCore {
    export let event: string;
    export { coreStep };
    export let coreStepId: string;
    export let coreStepName: string;
    export { coreStepDescription };
    export { hasBuildCommand as condition };
}
declare function coreStep({ configPath, buildDir, nodePath, childEnv, logs, netlifyConfig: { build: { command: buildCommand, commandOrigin: buildCommandOrigin }, }, }: {
    configPath: any;
    buildDir: any;
    nodePath: any;
    childEnv: any;
    logs: any;
    netlifyConfig: {
        build: {
            command: any;
            commandOrigin: any;
        };
    };
}): Promise<{}>;
declare function coreStepDescription({ netlifyConfig: { build: { commandOrigin: buildCommandOrigin }, }, }: {
    netlifyConfig: {
        build: {
            commandOrigin: any;
        };
    };
}): any;
declare function hasBuildCommand({ netlifyConfig: { build: { command: buildCommand }, }, }: {
    netlifyConfig: {
        build: {
            command: any;
        };
    };
}): boolean;
export {};
