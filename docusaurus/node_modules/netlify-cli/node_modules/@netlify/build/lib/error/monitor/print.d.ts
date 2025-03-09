export function printEventForTest({ name: errorClass, message: errorMessage }: {
    name: any;
    message: any;
}, { context, groupingHash, severity, unhandled, _metadata: { location, plugin: { packageName, homepage }, pluginPackageJson, tsConfig, env: { BUILD_ID }, other, }, }: {
    context: any;
    groupingHash: any;
    severity: any;
    unhandled: any;
    _metadata: {
        location: any;
        plugin?: {} | undefined;
        pluginPackageJson: any;
        tsConfig: any;
        env?: {} | undefined;
        other: any;
    };
}, logs: any): void;
