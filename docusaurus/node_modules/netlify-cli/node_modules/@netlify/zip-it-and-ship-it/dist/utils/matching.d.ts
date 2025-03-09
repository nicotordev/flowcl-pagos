import globFunction from 'glob';
import { MinimatchOptions } from 'minimatch';
/**
 * Both glob and minimatch only support unix style slashes in patterns
 * For this reason we wrap them and ensure all patters are always unixified
 * We use `normalize-path` here instead of `unixify` because we do not want to remove drive letters
 */
export declare const glob: (pattern: string, options: globFunction.IOptions) => Promise<string[]>;
export declare const minimatch: (target: string, pattern: string, options?: MinimatchOptions) => boolean;
