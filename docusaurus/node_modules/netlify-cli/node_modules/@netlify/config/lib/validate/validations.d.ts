export const PRE_CASE_NORMALIZE_VALIDATIONS: {
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: () => {
        build: {
            command: string;
        };
    };
}[];
export const PRE_MERGE_VALIDATIONS: ({
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            command: string;
        };
    };
} | {
    property: string;
    check: (value: any) => value is Record<PropertyKey, unknown>[];
    message: string;
    example: () => {
        plugins: {
            package: string;
        }[];
    };
})[];
export const PRE_CONTEXT_VALIDATIONS: ({
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: () => {
        context: {
            production: {
                publish: string;
            };
        };
    };
} | {
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: (contextProps: any, key: any) => {
        context: {
            [x: number]: {
                publish: string;
            };
        };
    };
})[];
export const PRE_NORMALIZE_VALIDATIONS: ({
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            command: string;
        };
    };
} | {
    property: string;
    check: (value: any) => value is Record<PropertyKey, unknown>[];
    message: string;
    example: () => {
        plugins: {
            package: string;
        }[];
    };
} | {
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: () => {
        functions: {
            external_node_modules: string[];
        };
    };
} | {
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: () => {
        functions: {
            ignored_node_modules: string[];
        };
    };
} | {
    property: string;
    check: (value: any) => value is Record<PropertyKey, unknown>[];
    message: string;
    example: () => {
        edge_functions: {
            path: string;
            function: string;
        }[];
    };
})[];
export const POST_NORMALIZE_VALIDATIONS: ({
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
} | {
    example: {
        plugins: {
            package: string;
            inputs: {
                port: number;
            };
        }[];
    };
    check: (value: any) => boolean;
    message: string;
    property: string;
} | {
    property: string;
    check: (packageName: any) => any;
    message: string;
    example: () => {
        plugins: {
            package: string;
        }[];
    };
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            base: string;
        };
    };
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            publish: string;
        };
    };
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            functions: string;
        };
    };
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: () => {
        build: {
            edge_functions: string;
        };
    };
} | {
    property: string;
    check: typeof isPlainObj;
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                external_node_modules: string[];
            };
        };
    };
} | {
    property: string;
    check: (value: any) => value is string;
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                deno_import_map: string;
            };
        };
    };
} | {
    property: string;
    check: (value: any) => value is string[];
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                external_node_modules: string[];
            };
        };
    };
} | {
    property: string;
    check: (value: any) => value is string[];
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                ignored_node_modules: string[];
            };
        };
    };
} | {
    property: string;
    check: (value: any) => value is string[];
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                included_files: string[];
            };
        };
    };
} | {
    property: string;
    check: (value: any) => boolean;
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                node_bundler: string;
            };
        };
    };
} | {
    property: string;
    check: (value: any, key: any, prevPath: any) => boolean;
    message: string;
    example: () => {
        functions: {
            directory: string;
        };
    };
} | {
    property: string;
    check: (cron: string) => boolean;
    message: string;
    example: (value: any, key: any, prevPath: any) => {
        functions: {
            [x: number]: {
                schedule: string;
            };
        };
    };
} | {
    example: () => {
        functions: {
            directory: string;
        };
    };
    formatInvalid: ({ functionsDirectory }?: {}) => {
        functions: {
            directory: any;
        };
    };
    propertyName: string;
    property: string;
    check: (value: any) => value is string;
    message: string;
})[];
import isPlainObj from 'is-plain-obj';
