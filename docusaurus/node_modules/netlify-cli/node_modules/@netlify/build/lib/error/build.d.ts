export function jsonToError({ name, message, stack, ...errorProps }: {
    [x: string]: any;
    name: any;
    message: any;
    stack: any;
}): Error;
export function errorToJson(error: any): any;
