import type { BuildFlags, Mode, TestOptions } from './types.js';
export declare const DEFAULT_API_HOST = "api.netlify.com";
export type ResolvedFlags = {
    env: Record<string, unknown>;
    token: string;
    mode: Mode;
    offline: boolean;
    telemetry: boolean;
    verbose: boolean;
    /** The dist directory of the functions @default `.netlify/functions/` */
    functionsDistDir: string;
    /** The dist directory of the edge functions @default `.netlify/edge-functions-dist/` */
    edgeFunctionsDistDir: string;
    /** The directory that is used for storing the cache @default `.netlify/cache/` */
    cacheDir: string;
    debug: boolean;
    sendStatus: boolean;
    saveConfig: boolean;
    /** Netlify API endpoint @default `api.netlify.com` */
    apiHost?: string;
    testOpts: TestOptions;
    statsd: {
        port: number;
    };
    timeline: 'build' | string;
    cachedConfig: Record<string, unknown>;
    siteId: string;
    dry: false;
    context: 'production' | string;
    statsdOpts: {
        host?: number;
        port: number;
    };
    bugsnagKey?: string;
    systemLogFile?: number;
};
/** Normalize CLI flags  */
export declare const normalizeFlags: (flags: Partial<BuildFlags>, logs: any) => ResolvedFlags;
