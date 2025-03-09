import type { Context } from "../context.ts";
declare global {
    var Netlify: NetlifyGlobal;
}
interface Env {
    delete: (key: string) => void;
    get: (key: string) => string | undefined;
    has: (key: string) => boolean;
    set: (key: string, value: string) => void;
    toObject: () => {
        [index: string]: string;
    };
}
export interface NetlifyGlobal {
    context: Context | null;
    env: Env;
}
export {};
