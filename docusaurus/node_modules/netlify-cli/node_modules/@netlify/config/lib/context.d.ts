export declare const normalizeContextProps: ({ config, config: { context: contextProps }, origin }: $TSFixMe) => any;
export declare const mergeContext: ({ config: { context: contextProps, ...config }, config: { plugins }, context, branch, logs, }: $TSFixMe) => any;
export declare const ensureConfigPriority: ({ build, ...config }: {
    [x: string]: any;
    build?: {} | undefined;
}, context: any, branch: any) => {
    context: any;
    build: {};
};
