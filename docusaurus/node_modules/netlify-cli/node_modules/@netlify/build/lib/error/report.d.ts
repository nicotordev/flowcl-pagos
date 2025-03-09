import { InputStatsDOptions } from '../report/statsd.js';
/**
 * Record error rates of the build phase for monitoring.
 * Sends to statsd daemon.
 */
export declare const reportError: (error: Error, statsdOpts: InputStatsDOptions, framework?: string) => Promise<void>;
