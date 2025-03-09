import { BufferedLogs } from '../log/logger.js';
import { CONDITIONS } from './plugin_conditions.js';
/**
 * The resolved and normalized Plugin list
 */
export type PluginList = Record<string, PluginVersion[]>;
export type PluginVersion = {
    version: string;
    migrationGuide?: string;
    featureFlag?: string;
    overridePinnedVersion?: string;
    conditions: {
        type: keyof typeof CONDITIONS;
        condition: string | Record<string, string>;
    }[];
};
/**
 * Retrieve the list of plugins officially vetted by us and displayed in our
 * plugins directory UI.
 * We fetch this list during each build (no caching) because we want new
 * versions of plugins to be available instantly to all users. The time to
 * make this request is somewhat ok (in the 100ms range).
 * We only fetch this plugins list when needed, i.e. we defer it as much as
 * possible.
 */
export declare const getPluginsList: ({ debug, logs, testOpts: { pluginsListUrl }, }: {
    testOpts?: {
        pluginsListUrl?: string;
    };
    debug?: boolean;
    logs?: BufferedLogs;
}) => Promise<PluginList>;
