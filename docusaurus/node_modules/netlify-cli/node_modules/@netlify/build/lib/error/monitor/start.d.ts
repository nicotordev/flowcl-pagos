import type { ResolvedFlags } from '../../core/normalize_flags.js';
import { BufferedLogs } from '../../log/logger.js';
export declare const startErrorMonitor: (config: {
    flags: ResolvedFlags;
    logs?: BufferedLogs;
    bugsnagKey?: string;
}) => any;
