import type { PluginList } from '../../plugins/list.js';
import { BufferedLogs } from '../logger.js';
export declare const logPluginsFetchError: (logs: BufferedLogs | undefined, message: string) => void;
export declare const logPluginsList: ({ pluginsList, debug, logs, }: {
    pluginsList: PluginList;
    logs: BufferedLogs | undefined;
    debug?: boolean;
}) => void;
export declare const logFailPluginWarning: (methodName: any, event: any) => void;
export declare const logDeploySuccess: (logs?: BufferedLogs) => void;
