export const ERROR_CALL_TO_ACTION: "Double-check your login status with 'netlify status' or contact support with details of your error.";
export function throwOnInvalidTomlSequence(invalidSequence: any): void;
export function warnLegacyFunctionsDirectory({ config, logs }: {
    config?: {} | undefined;
    logs: any;
}): void;
export function warnContextPluginConfig(logs: any, packageName: any, context: any): void;
export function throwContextPluginsConfig(packageName: any, context: any): void;
export function warnHeadersParsing(logs: any, errors: any): void;
export function warnHeadersCaseSensitivity(logs: any, headers: any): void;
export function warnRedirectsParsing(logs: any, errors: any): void;
