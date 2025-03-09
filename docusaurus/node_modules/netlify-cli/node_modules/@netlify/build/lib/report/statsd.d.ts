import { StatsD } from 'hot-shots';
export interface InputStatsDOptions {
    host?: string;
    port?: number;
}
export type StatsDOptions = Required<InputStatsDOptions>;
export declare const validateStatsDOptions: (statsdOpts: InputStatsDOptions) => statsdOpts is StatsDOptions;
/**
 * Start a new StatsD Client and a new UDP socket
 */
export declare const startClient: (statsdOpts: StatsDOptions) => Promise<StatsD>;
/**
 * Close the StatsD Client
 *
 * UDP packets are buffered and flushed every 10 seconds and
 * closing the client forces all buffered metrics to be flushed.
 */
export declare const closeClient: (client: StatsD) => Promise<void>;
/**
 * Make sure the timer name does not include special characters.
 * For example, the `packageName` of local plugins includes dots.
 */
export declare const normalizeTagName: (name: string) => string;
/**
 * Formats and flattens the tags as array
 * We do this because we might send the same tag with different values `{ tag: ['a', 'b'] }`
 * which cannot be represented in an flattened object and `hot-shots` also supports tags as array in the format `['tag:a', 'tag:b']`
 */
export declare const formatTags: (tags: Record<string, string | string[]>) => string[];
