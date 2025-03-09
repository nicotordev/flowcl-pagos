import { BufferedLogs } from '../logger.js';
export declare const logRuntime: (logs: any, pluginOptions: any) => void;
export declare const logLoadingIntegration: (logs: any, pluginOptions: any) => void;
export declare const logLoadingPlugins: (logs: any, pluginsOptions: any, debug: any) => void;
export declare const logOutdatedPlugins: (logs: BufferedLogs, pluginsOptions: any) => void;
export declare const logIncompatiblePlugins: (logs: any, pluginsOptions: any) => void;
