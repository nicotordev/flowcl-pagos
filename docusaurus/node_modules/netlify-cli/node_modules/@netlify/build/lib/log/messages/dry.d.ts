export function logDryRunStart({ logs, eventWidth, stepsCount }: {
    logs: any;
    eventWidth: any;
    stepsCount: any;
}): void;
export function logDryRunStep({ logs, step: { event, packageName, coreStepDescription }, index, netlifyConfig, eventWidth, stepsCount, }: {
    logs: any;
    step: {
        event: any;
        packageName: any;
        coreStepDescription: any;
    };
    index: any;
    netlifyConfig: any;
    eventWidth: any;
    stepsCount: any;
}): void;
export function logDryRunEnd(logs: any): void;
