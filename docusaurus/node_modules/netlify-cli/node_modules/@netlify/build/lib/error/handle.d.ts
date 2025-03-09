import { ErrorParam } from '../core/types.js';
export declare const handleBuildError: (error: Error, { errorMonitor, netlifyConfig, childEnv, logs, debug, testOpts }: ErrorParam) => Promise<import("./types.js").BasicErrorInfo>;
