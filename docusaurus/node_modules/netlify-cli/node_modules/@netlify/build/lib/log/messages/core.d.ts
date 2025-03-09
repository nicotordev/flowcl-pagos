import { BufferedLogs } from '../logger.js';
import { OutputFlusher } from '../output_flusher.js';
export declare const logBuildStart: (logs?: BufferedLogs) => void;
export declare const logBuildError: ({ error, netlifyConfig, logs, debug }: {
    error: any;
    netlifyConfig: any;
    logs: any;
    debug: any;
}) => void;
export declare const logBuildSuccess: (logs: any) => void;
export declare const logTimer: (logs: any, durationNs: any, timerName: any, systemLog: any, outputFlusher?: OutputFlusher) => void;
export declare const logMissingSideFile: (logs: any, sideFile: any, publish: any) => void;
export declare const logLingeringProcesses: (logs: any, commands: any) => void;
