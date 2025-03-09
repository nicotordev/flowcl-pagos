export const UI_ORIGIN: "ui";
export const CONFIG_ORIGIN: "config";
export const DEFAULT_ORIGIN: "default";
export const INLINE_ORIGIN: "inline";
export function addOrigins(config: any, origin: any): {
    redirects: any;
} | {
    redirectsOrigin: any;
    redirects: any;
};
