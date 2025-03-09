import { EdgeFunction } from '../edge_function.js';
import type { FormatFunction } from '../server/server.js';
interface GenerateStage2Options {
    bootstrapURL: string;
    distDirectory: string;
    fileName: string;
    formatExportTypeError?: FormatFunction;
    formatImportError?: FormatFunction;
    functions: EdgeFunction[];
}
declare const generateStage2: ({ bootstrapURL, distDirectory, fileName, formatExportTypeError, formatImportError, functions, }: GenerateStage2Options) => Promise<string>;
interface GetLocalEntryPointOptions {
    bootstrapURL: string;
    formatExportTypeError?: FormatFunction;
    formatImportError?: FormatFunction;
}
declare const getLocalEntryPoint: (functions: EdgeFunction[], { bootstrapURL, formatExportTypeError, formatImportError, }: GetLocalEntryPointOptions) => string;
export { generateStage2, getLocalEntryPoint };
