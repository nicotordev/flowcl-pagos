import type { BuildError } from '../types.js';
export declare const serializeLogError: ({ fullErrorInfo: { title, severity, message, pluginInfo, locationInfo, tsConfigInfo, errorProps }, }: {
    fullErrorInfo: BuildError;
}) => {
    title: string | (import("../types.js").TitleFunction & string);
    body: any;
};
