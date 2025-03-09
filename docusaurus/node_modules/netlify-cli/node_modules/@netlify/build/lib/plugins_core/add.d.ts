export function addCorePlugins({ netlifyConfig: { plugins }, constants }: {
    netlifyConfig: {
        plugins: any;
    };
    constants: any;
}): {
    packageName: any;
    pluginPath: any;
    pinnedVersion: any;
    loadedFrom: any;
    origin: any;
    inputs: any;
}[];
