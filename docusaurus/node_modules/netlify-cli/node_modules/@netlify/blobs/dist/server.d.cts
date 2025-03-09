import http from 'node:http';

type Logger = (...message: unknown[]) => void;

declare enum Operation {
    DELETE = "delete",
    GET = "get",
    GET_METADATA = "getMetadata",
    LIST = "list",
    SET = "set"
}
type OnRequestCallback = (parameters: {
    type: Operation;
    url: string;
}) => void;
interface BlobsServerOptions {
    /**
     * Whether debug-level information should be logged, such as internal errors
     * or information about incoming requests.
     */
    debug?: boolean;
    /**
     * Base directory to read and write files from.
     */
    directory: string;
    /**
     * Function to log messages. Defaults to `console.log`.
     */
    logger?: Logger;
    /**
     * Callback function to be called on every request.
     */
    onRequest?: OnRequestCallback;
    /**
     * Port to run the server on. Defaults to a random port.
     */
    port?: number;
    /**
     * Static authentication token that should be present in all requests. If not
     * supplied, no authentication check is performed.
     */
    token?: string;
}
declare class BlobsServer {
    private address;
    private debug;
    private directory;
    private logger;
    private onRequest?;
    private port;
    private server?;
    private token?;
    private tokenHash;
    constructor({ debug, directory, logger, onRequest, port, token }: BlobsServerOptions);
    private dispatchOnRequestEvent;
    logDebug(...message: unknown[]): void;
    delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    head(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    listBlobs(options: {
        dataPath: string;
        metadataPath: string;
        rootPath: string;
        req: http.IncomingMessage;
        res: http.ServerResponse;
        url: URL;
    }): Promise<void>;
    listStores(req: http.IncomingMessage, res: http.ServerResponse, rootPath: string, prefix: string): Promise<void>;
    put(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    /**
     * Parses the URL and returns the filesystem paths where entries and metadata
     * should be stored.
     */
    getLocalPaths(url?: URL): {
        rootPath?: undefined;
        dataPath?: undefined;
        key?: undefined;
        metadataPath?: undefined;
    } | {
        rootPath: string;
        dataPath?: undefined;
        key?: undefined;
        metadataPath?: undefined;
    } | {
        dataPath: string;
        key: string;
        metadataPath: string;
        rootPath: string;
    };
    handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void | Promise<void>;
    /**
     * Tries to parse a URL as being an API request and returns the different
     * components, such as the store name, site ID, key, and signed URL.
     */
    parseAPIRequest(req: http.IncomingMessage): {
        key: string | undefined;
        siteID: string;
        storeName: string;
        url: URL;
        useSignedURL: boolean;
    } | null;
    sendResponse(req: http.IncomingMessage, res: http.ServerResponse, status: number, body?: string): void;
    start(): Promise<{
        address: string;
        family: string;
        port: number;
    }>;
    stop(): Promise<void>;
    validateAccess(req: http.IncomingMessage): boolean;
    /**
     * Traverses a path and collects both blobs and directories into a `result`
     * object, taking into account the `directories` and `prefix` parameters.
     */
    private static walk;
}

export { BlobsServer, OnRequestCallback, Operation };
