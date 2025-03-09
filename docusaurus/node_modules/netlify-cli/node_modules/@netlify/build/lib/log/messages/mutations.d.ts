export function logConfigMutations(logs: any, newConfigMutations: any, debug: any): void;
export function systemLogConfigMutations(systemLog: any, configMutations: any): void;
export function logConfigOnUpload({ logs, configPath, debug }: {
    logs: any;
    configPath: any;
    debug: any;
}): Promise<void>;
export function logHeadersOnUpload({ logs, headersPath, debug }: {
    logs: any;
    headersPath: any;
    debug: any;
}): Promise<void>;
export function logRedirectsOnUpload({ logs, redirectsPath, debug }: {
    logs: any;
    redirectsPath: any;
    debug: any;
}): Promise<void>;
