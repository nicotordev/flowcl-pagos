export function simplifyConfig({ build: { environment, processing: { css, html, images, js, ...processing }, services, ...build }, functions, plugins, headers, redirects, context, ...config }: {
    [x: string]: any;
    build?: {
        processing?: {} | undefined;
    } | undefined;
    functions: any;
    plugins: any;
    headers: any;
    redirects: any;
    context?: {} | undefined;
}): any;
export function removeEmptyObject(object: any, propName: any): {
    [x: number]: Partial<any>;
};
export function removeEmptyArray(array: any, propName: any): {
    [x: number]: any[];
};
