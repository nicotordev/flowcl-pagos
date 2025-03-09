import type { Declaration } from './declaration.js';
import type { Layer } from './layer.js';
import type { Logger } from './logger.js';
export interface DeployConfig {
    declarations: Declaration[];
    importMap?: string;
    layers: Layer[];
}
export declare const load: (path: string | undefined, logger: Logger) => Promise<DeployConfig>;
