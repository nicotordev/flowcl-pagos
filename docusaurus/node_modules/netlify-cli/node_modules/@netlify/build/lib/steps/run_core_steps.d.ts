import type { BuildFlags, BuildResult } from '../core/types.js';
/**
 * Runs specific core steps for a build and returns whether it succeeded or not.
 */
export declare const runCoreSteps: (buildSteps: string[], flags?: Partial<BuildFlags>) => Promise<BuildResult>;
