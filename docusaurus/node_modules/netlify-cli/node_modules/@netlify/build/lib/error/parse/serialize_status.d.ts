import type { BuildError } from '../types.js';
type ErrorState = 'failed_build' | 'failed_plugin' | 'canceled_build';
export declare const serializeErrorStatus: ({ fullErrorInfo: { title, message, locationInfo, errorProps, errorMetadata }, state, }: {
    fullErrorInfo: BuildError;
    state: ErrorState;
}) => {
    state: ErrorState;
    title: string | (import("../types.js").TitleFunction & string);
    summary: string;
    text: string | undefined;
    extraData: any;
};
export {};
