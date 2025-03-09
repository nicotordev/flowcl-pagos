export const bundlers: string[];
export const WILDCARD_ALL: "*";
export function normalizeFunctionsProps({ functions: v1FunctionsDirectory, ...build }: {
    [x: string]: any;
    functions: any;
}, { [WILDCARD_ALL]: wildcardProps, ...functions }: {
    [x: string]: any;
    "*": any;
}): {
    build: {
        [x: string]: any;
    };
    functions: {
        "*": {
            [x: string]: any;
        };
    };
    functionsDirectoryProps: {
        functionsDirectory: any;
        functionsDirectoryOrigin: string;
    } | {
        functionsDirectory?: undefined;
        functionsDirectoryOrigin?: undefined;
    };
};
export const FUNCTION_CONFIG_PROPERTIES: Set<string>;
