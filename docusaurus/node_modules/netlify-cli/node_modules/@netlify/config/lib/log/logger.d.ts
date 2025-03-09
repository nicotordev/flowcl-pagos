export function logsAreBuffered(logs: any): boolean;
export function getBufferLogs({ buffer }: {
    buffer: any;
}): {
    stdout: never[];
    stderr: never[];
} | undefined;
export function log(logs: any, string: any, { color }?: {}): void;
export function logWarning(logs: any, string: any, opts: any): void;
export function logObject(logs: any, object: any, opts: any): void;
export function logSubHeader(logs: any, string: any, opts: any): void;
