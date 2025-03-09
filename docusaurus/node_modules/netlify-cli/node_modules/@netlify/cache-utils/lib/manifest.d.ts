export declare const getManifestInfo: ({ cachePath, move, ttl, digests }: {
    cachePath: any;
    move: any;
    ttl: any;
    digests: any;
}) => Promise<{
    manifestInfo: {
        manifestPath: string;
        manifestString: string;
    };
    identical: boolean;
}>;
export declare const writeManifest: ({ manifestPath, manifestString }: {
    manifestPath: any;
    manifestString: any;
}) => Promise<void>;
export declare const removeManifest: (cachePath: string) => Promise<void>;
export declare const isManifest: (filePath: any) => any;
export declare const isExpired: (cachePath: any) => Promise<boolean>;
