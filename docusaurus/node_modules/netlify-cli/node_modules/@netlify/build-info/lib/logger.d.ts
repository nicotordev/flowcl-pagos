declare enum LogLevel {
    DEBUG = "debug",
    LOG = "log",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
type LogLevelString = `${LogLevel}`;
export interface Logger {
    logLevel?: LogLevelString;
    debug(...any: any[]): void;
    log(...any: any[]): void;
    error(...any: any[]): void;
    info(...any: any[]): void;
    warn(...any: any[]): void;
}
export declare class DefaultLogger implements Logger {
    logLevel: LogLevelString;
    constructor(logLevel?: LogLevelString);
    private shouldLog;
    debug(...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export {};
