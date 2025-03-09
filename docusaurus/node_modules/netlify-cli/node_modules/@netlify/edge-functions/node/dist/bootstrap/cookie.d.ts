export interface Cookie {
    /** Name of the cookie. */
    name: string;
    /** Value of the cookie. */
    value: string;
    /** The cookie's `Expires` attribute, either as an explicit date or UTC milliseconds.
     * @example <caption>Explicit date:</caption>
     *
     * ```ts
     * import { Cookie } from "@netlify/edge-functions";
     * const cookie: Cookie = {
     *   name: 'name',
     *   value: 'value',
     *   // expires on Fri Dec 30 2022
     *   expires: new Date('2022-12-31')
     * }
     * ```
     *
     * @example <caption>UTC milliseconds</caption>
     *
     * ```ts
     * import { Cookie } from "@netlify/edge-functions";
     * const cookie: Cookie = {
     *   name: 'name',
     *   value: 'value',
     *   // expires 10 seconds from now
     *   expires: Date.now() + 10000
     * }
     * ```
     */
    expires?: Date | number;
    /** The cookie's `Max-Age` attribute, in seconds. Must be a non-negative integer. A cookie with a `maxAge` of `0` expires immediately. */
    maxAge?: number;
    /** The cookie's `Domain` attribute. Specifies those hosts to which the cookie will be sent. */
    domain?: string;
    /** The cookie's `Path` attribute. A cookie with a path will only be included in the `Cookie` request header if the requested URL matches that path. */
    path?: string;
    /** The cookie's `Secure` attribute. If `true`, the cookie will only be included in the `Cookie` request header if the connection uses SSL and HTTPS. */
    secure?: boolean;
    /** The cookie's `HTTPOnly` attribute. If `true`, the cookie cannot be accessed via JavaScript. */
    httpOnly?: boolean;
    /**
     * Allows servers to assert that a cookie ought not to
     * be sent along with cross-site requests.
     */
    sameSite?: "Strict" | "Lax" | "None";
    /** Additional key value pairs with the form "key=value" */
    unparsed?: string[];
}
export interface DeleteCookieOptions {
    domain?: string;
    name: string;
    path?: string;
}
export interface Cookies {
    delete(name: string): void;
    delete(options: DeleteCookieOptions): void;
    get(name: string): string;
    get(cookie: Pick<Cookie, "name">): string;
    set(name: string, value: string): void;
    set(input: Cookie): void;
}
