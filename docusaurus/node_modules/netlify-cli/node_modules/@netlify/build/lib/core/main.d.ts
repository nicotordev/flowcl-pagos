import type { BufferedLogs } from '../log/logger.js';
import { BuildFlags } from './types.js';
/**
 * Main entry point of Netlify Build.
 * Runs a builds and returns whether it succeeded or not.
 *
 * @param flags - build configuration CLI flags
 */
export declare function buildSite(flags?: Partial<BuildFlags>): Promise<{
    success: boolean;
    severityCode: number;
    logs: BufferedLogs | undefined;
    netlifyConfig?: any;
    configMutations?: any;
}>;
