import { AdapterInstance, AdapterOptions, Adapter } from '../index.js';
import '../shared/crossws.ChIJSJVK.js';

interface DenoAdapter extends AdapterInstance {
    handleUpgrade(req: Request, info: ServeHandlerInfo): Promise<Response>;
}
interface DenoOptions extends AdapterOptions {
}
type ServeHandlerInfo = {
    remoteAddr?: {
        transport: string;
        hostname: string;
        port: number;
    };
};
declare const _default: Adapter<DenoAdapter, DenoOptions>;

export { type DenoAdapter, type DenoOptions, _default as default };
