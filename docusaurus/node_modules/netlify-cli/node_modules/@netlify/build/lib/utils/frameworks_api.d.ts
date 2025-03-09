export declare const FRAMEWORKS_API_ENDPOINT = ".netlify/v1";
export declare const FRAMEWORKS_API_BLOBS_ENDPOINT = ".netlify/v1/blobs";
export declare const FRAMEWORKS_API_CONFIG_ENDPOINT = ".netlify/v1/config.json";
export declare const FRAMEWORKS_API_EDGE_FUNCTIONS_ENDPOINT = ".netlify/v1/edge-functions";
export declare const FRAMEWORKS_API_EDGE_FUNCTIONS_IMPORT_MAP = "import_map.json";
export declare const FRAMEWORKS_API_FUNCTIONS_ENDPOINT = ".netlify/v1/functions";
type DirectoryTreeFiles = Map<string, string[]>;
/**
 * Traverses a directory tree in search of leaf files. The key of each leaf
 * file is determined by its path relative to the base directory.
 *
 * For example, given the following directory tree:
 *
 * .netlify/
 * └── v1/
 *     └── blobs/
 *         └── deploy/
 *             ├── example.com/
 *             │   └── blob
 *             └── netlify.com/
 *                 ├── blob
 *                 └── blob.meta.json
 *
 * If this method is called on `.netlify/v1/blobs/deploy` with `blob` and
 * `blob.meta.json` as leaf names, it will return the following Map:
 *
 * {
 *   "example.com" => [
 *      "/full/path/to/.netlify/v1/blobs/deploy/example.com/blob"
 *   ],
 *   "netlify.com" => [
 *      "/full/path/to/.netlify/v1/blobs/deploy/netlify.com/blob",
 *      "/full/path/to/.netlify/v1/blobs/deploy/netlify.com/blob.meta.json"
 *   ]
 * }
 */
export declare const findFiles: (directory: string, leafNames: Set<string>) => Promise<DirectoryTreeFiles>;
/**
 * Finds blobs and their corresponding metadata files in a given directory.
 */
export declare const getBlobs: (blobsDirectory: string) => Promise<{
    key: string;
    contentPath: string;
    metadataPath?: string;
}[]>;
export {};
