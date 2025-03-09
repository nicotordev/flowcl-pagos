/** Retrieve the absolute path of the deploy scoped internal blob directories */
export declare const getBlobsDirs: (buildDir: string, packagePath?: string) => string[];
interface EnvironmentContext {
    api?: {
        host: string;
        scheme: string;
    };
    deployId?: string;
    siteId?: string;
    token?: string;
}
export declare const getBlobsEnvironmentContext: ({ api, deployId, siteId, token, }: EnvironmentContext) => {
    NETLIFY_BLOBS_CONTEXT?: undefined;
} | {
    NETLIFY_BLOBS_CONTEXT: string;
};
/**
 * Detect if there are any blobs to upload, and if so, what directory they're
 * in and what version of the file-based API is being used.
 *
 * @param buildDir The build directory. (current working directory where the build is executed)
 * @param packagePath An optional package path for monorepos
 * @returns
 */
export declare const scanForBlobs: (buildDir: string, packagePath?: string) => Promise<{
    apiVersion: number;
    directory: string;
} | null>;
/**
 * Returns the blobs that should be uploaded for a given directory tree. The
 * result is an array with the blob key, the path to its data file, and the
 * path to its metadata file.
 */
export declare const getKeysToUpload: (blobsDir: string) => Promise<{
    key: string;
    contentPath: string;
    metadataPath: string;
}[]>;
/** Read a file and its metadata file from the blobs directory */
export declare const getFileWithMetadata: (key: string, contentPath: string, metadataPath?: string) => Promise<{
    data: Buffer;
    metadata: Record<string, string>;
}>;
export {};
