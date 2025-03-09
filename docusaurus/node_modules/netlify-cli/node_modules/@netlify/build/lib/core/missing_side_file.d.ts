export function warnOnMissingSideFiles({ buildDir, netlifyConfig: { build: { publish }, }, logs, }: {
    buildDir: any;
    netlifyConfig: {
        build: {
            publish: any;
        };
    };
    logs: any;
}): Promise<void>;
