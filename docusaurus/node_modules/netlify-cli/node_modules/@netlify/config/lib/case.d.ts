export declare const normalizeConfigCase: ({ Build, build, ...config }: {
    Build: Record<string, unknown>;
    build: Record<string, unknown>;
    [key: string]: unknown;
}) => Record<string, unknown>;
