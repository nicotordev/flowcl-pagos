export function warnOnLingeringProcesses({ mode, logs, testOpts: { silentLingeringProcesses }, }: {
    mode: any;
    logs: any;
    testOpts: {
        silentLingeringProcesses?: boolean | undefined;
    };
}): Promise<void>;
