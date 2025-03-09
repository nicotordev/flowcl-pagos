export function cleanupConfig({ build: { base, command, commandOrigin, environment, edge_functions: edgeFunctions, ignore, processing, publish, publishOrigin, }, headers, headersOrigin, plugins, redirects, redirectsOrigin, baseRelDir, functions, functionsDirectory, }: {
    build?: {
        environment?: {} | undefined;
    } | undefined;
    headers: any;
    headersOrigin: any;
    plugins?: never[] | undefined;
    redirects: any;
    redirectsOrigin: any;
    baseRelDir: any;
    functions: any;
    functionsDirectory: any;
}): any;
export function cleanupEnvironment(environment: any): string[];
