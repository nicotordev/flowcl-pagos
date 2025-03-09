import type { FeatureFlags } from '../core/feature_flags.js';
import type { SystemLogger } from '../plugins_core/types.js';
import type { ChildProcess } from './spawn.js';
export declare const captureStandardError: (childProcess: ChildProcess, systemLog: SystemLogger, eventName: string, featureFlags: FeatureFlags) => () => void;
