import type { Context } from "./context.ts";
interface EdgeFunction {
    (request: Request, context: Context): Response | Promise<Response> | URL | Promise<URL> | void | Promise<void>;
}
export type { EdgeFunction };
