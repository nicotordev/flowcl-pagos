export declare const parsePath: ({ path, cacheDir, cwdOpt }: {
    path: any;
    cacheDir: any;
    cwdOpt: any;
}) => Promise<{
    srcPath: string;
    cachePath: string;
}>;
export declare const getBases: (cwdOpt?: string) => Promise<{
    name: string;
    base: string;
}[]>;
