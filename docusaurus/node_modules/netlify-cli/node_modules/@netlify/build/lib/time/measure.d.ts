/** Starts a timer */
export declare const startTimer: NodeJS.HRTime;
/** Stops a timer */
export declare const endTimer: ([startSecs, startNsecs]: [number, number]) => number;
/**
 * statsd expects milliseconds integers.
 * To prevent double rounding errors, rounding should only be applied once.
 */
export declare const roundTimerToMillisecs: (durationNs: number) => number;
