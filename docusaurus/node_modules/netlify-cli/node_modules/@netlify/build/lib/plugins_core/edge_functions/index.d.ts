import { Metric } from '../../core/report_metrics.js';
export declare const bundleEdgeFunctions: {
    event: string;
    coreStep: ({ buildDir, packagePath, constants: { EDGE_FUNCTIONS_DIST: distDirectory, EDGE_FUNCTIONS_SRC: srcDirectory, INTERNAL_EDGE_FUNCTIONS_SRC: internalSrcDirectory, IS_LOCAL: isRunningLocally, }, debug, systemLog, featureFlags, logs, netlifyConfig, edgeFunctionsBootstrapURL, }: {
        buildDir: string;
        packagePath: string;
        constants: Record<string, string>;
        debug: boolean;
        systemLog(...args: any[]): void;
        featureFlags: Record<string, any>;
        logs: any;
        netlifyConfig: any;
        edgeFunctionsBootstrapURL?: string;
    }) => Promise<{
        metrics: Metric[];
    }>;
    coreStepId: string;
    coreStepName: string;
    coreStepDescription: () => string;
    condition: ({ buildDir, constants: { INTERNAL_EDGE_FUNCTIONS_SRC, EDGE_FUNCTIONS_SRC }, packagePath, }: {
        buildDir: any;
        constants: {
            INTERNAL_EDGE_FUNCTIONS_SRC: any;
            EDGE_FUNCTIONS_SRC: any;
        };
        packagePath: any;
    }) => Promise<boolean>;
};
