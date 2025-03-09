export function logFlags(logs: any, flags: any, { debug }: {
    debug: any;
}): void;
export function logBuildDir(logs: any, buildDir: any): void;
export function logConfigPath(logs: any, configPath?: string): void;
export function logConfig({ logs, netlifyConfig, debug }: {
    logs: any;
    netlifyConfig: any;
    debug: any;
}): void;
export function logConfigOnUpdate({ logs, netlifyConfig, debug }: {
    logs: any;
    netlifyConfig: any;
    debug: any;
}): void;
export function logConfigOnError({ logs, netlifyConfig, severity }: {
    logs: any;
    netlifyConfig: any;
    severity: any;
}): void;
export function logContext(logs: any, context: any): void;
