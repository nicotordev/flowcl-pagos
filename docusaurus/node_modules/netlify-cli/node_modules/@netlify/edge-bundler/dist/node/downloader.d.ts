import { Logger } from './logger.js';
declare const downloadWithRetry: (targetDirectory: string, versionRange: string, logger: Logger) => Promise<string>;
export { downloadWithRetry as download };
