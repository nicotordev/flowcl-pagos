export declare const validations: ({
    example: () => {
        edge_functions: {
            path: string;
            function: string;
        }[];
    };
    check: (value: any) => boolean;
    message: string;
    property: string;
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        edge_functions: {
            pattern: string;
            function: string;
        }[];
    };
} | {
    property: string;
    check: (pathName: any) => any;
    message: string;
    example: () => {
        edge_functions: {
            path: string;
            function: string;
        }[];
    };
})[];
