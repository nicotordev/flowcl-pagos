import { EdgeFunction } from './edge_function.js';
export declare const removeDuplicatesByExtension: (functions: string[]) => string[];
declare const findFunctions: (directories: string[]) => Promise<EdgeFunction[]>;
export { findFunctions };
