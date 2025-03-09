import { OnAfterDownloadHook, OnBeforeDownloadHook } from './bridge.js';
import { Declaration } from './declaration.js';
import { EdgeFunction } from './edge_function.js';
import { FeatureFlags } from './feature_flags.js';
import { LogFunction } from './logger.js';
export interface BundleOptions {
    basePath?: string;
    bootstrapURL?: string;
    cacheDirectory?: string;
    configPath?: string;
    debug?: boolean;
    distImportMapPath?: string;
    featureFlags?: FeatureFlags;
    importMapPaths?: (string | undefined)[];
    internalSrcFolder?: string | string[];
    onAfterDownload?: OnAfterDownloadHook;
    onBeforeDownload?: OnBeforeDownloadHook;
    rootPath?: string;
    systemLogger?: LogFunction;
    userLogger?: LogFunction;
    vendorDirectory?: string;
}
export declare const bundle: (sourceDirectories: string[], distDirectory: string, tomlDeclarations?: Declaration[], { basePath: inputBasePath, cacheDirectory, configPath, debug, distImportMapPath, featureFlags: inputFeatureFlags, importMapPaths, internalSrcFolder, onAfterDownload, onBeforeDownload, rootPath, userLogger, systemLogger, vendorDirectory, }?: BundleOptions) => Promise<{
    functions: EdgeFunction[];
    manifest: import("./manifest.js").Manifest;
}>;
