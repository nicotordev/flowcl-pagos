declare const SEVERITY_MAP: {
    success: {
        severityCode: number;
        status: string;
    };
    none: {
        severityCode: number;
        status: string;
    };
    info: {
        severityCode: number;
        status: string;
    };
    warning: {
        severityCode: number;
        status: string;
    };
    error: {
        severityCode: number;
        status: string;
    };
};
export type Severity = keyof typeof SEVERITY_MAP;
/** Map error severities to exit codes and status (used for telemetry purposes) */
export declare const FALLBACK_SEVERITY_ENTRY: {
    severityCode: number;
    status: string;
};
/**
 * Used to extract exit codes and respective status strings
 * 1|2|3 indicate whether this was a user|plugin|system error.
 */
export declare const getSeverity: (severity?: Severity) => {
    severityCode: number;
    status: string;
    success: boolean;
};
export {};
