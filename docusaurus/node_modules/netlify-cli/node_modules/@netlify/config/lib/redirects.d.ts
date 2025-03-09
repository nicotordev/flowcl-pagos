export declare const getRedirectsPath: ({ build: { publish } }: $TSFixMe) => string;
/**
 * Add `config.redirects`
 */
export declare const addRedirects: ({ config: { redirects: configRedirects, ...config }, redirectsPath, logs, }: {
    config: $TSFixMe;
    redirectsPath: string;
    logs: $TSFixMe;
    featureFlags?: $TSFixMe;
}) => Promise<any>;
