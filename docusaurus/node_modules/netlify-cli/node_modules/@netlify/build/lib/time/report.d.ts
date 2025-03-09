import { InputStatsDOptions } from '../report/statsd.js';
interface Timer {
    metricName: string;
    stageTag: string;
    parentTag: string;
    durationNs: number;
    tags: Record<string, string | string[]>;
}
/**
 * Record the duration of a build phase, for monitoring.
 * Sends to statsd daemon.
 */
export declare const reportTimers: (timers: Timer[], statsdOpts: InputStatsDOptions, framework?: string) => Promise<void>;
export {};
