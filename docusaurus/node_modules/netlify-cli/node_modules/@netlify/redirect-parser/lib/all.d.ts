/**
 * Parse all redirects given programmatically via the `configRedirects` property, `netlify.toml` and `_redirects`
 * files, then normalize and validate those.
 */
export declare const parseAllRedirects: ({ redirectsFiles, netlifyConfigPath, configRedirects, minimal, }: {
    redirectsFiles: string[];
    netlifyConfigPath?: string;
    configRedirects: string[];
    minimal: boolean;
}) => Promise<{
    redirects: unknown[];
    errors: any[];
}>;
