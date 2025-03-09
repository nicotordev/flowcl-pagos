import type { DenoBridge } from './bridge.js';
import type { Logger } from './logger.js';
declare const ensureLatestTypes: (deno: DenoBridge, logger: Logger, customTypesURL?: string) => Promise<void>;
export { ensureLatestTypes };
