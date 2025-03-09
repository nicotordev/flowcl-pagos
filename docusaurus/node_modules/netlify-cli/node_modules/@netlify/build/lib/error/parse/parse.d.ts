import type { BuildError, BasicErrorInfo } from '../types.js';
export declare const getFullErrorInfo: ({ error, colors, debug }: {
    error: any;
    colors: any;
    debug: any;
}) => BuildError;
export declare const parseErrorInfo: (error: Error) => BasicErrorInfo;
