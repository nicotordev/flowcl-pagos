export function tryResolvePath(path: any, basedir: any): Promise<{
    path: any;
    error?: undefined;
} | {
    error: any;
    path?: undefined;
}>;
export function resolvePath(path: any, basedir: any): Promise<any>;
