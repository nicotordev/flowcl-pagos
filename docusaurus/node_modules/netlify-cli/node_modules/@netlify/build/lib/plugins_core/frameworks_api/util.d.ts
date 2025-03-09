import type { NetlifyConfig } from '../../index.js';
import { SystemLogger } from '../types.js';
export declare const loadConfigFile: (buildDir: string, packagePath?: string) => Promise<Partial<NetlifyConfig> | undefined>;
/**
 * Checks whether a property can be defined using the Deploy Configuration API.
 */
export declare const isAllowedProperty: (property: string[], allowedProperties: string[][]) => boolean;
/**
 * Takes a candidate configuration object and returns a normalized version that
 * includes only the properties that are present in an allow-list. It does so
 * recursively, so `allowedProperties` can contain the full list of properties
 * that the Deploy Configuration API can interact with.
 */
export declare const filterConfig: (obj: Record<string, unknown>, path: string[], allowedProperties: string[][], systemLog: SystemLogger) => Record<string, unknown>;
