export function addDefaultOpts(opts?: {}): {
    logs: {
        stdout: never[];
        stderr: never[];
    } | undefined;
};
export function normalizeOpts(opts: any): Promise<any>;
