export function getUserAndInternalFunctions({ featureFlags, functionsSrc, functionsSrcExists, internalFunctionsSrc, internalFunctionsSrcExists, frameworkFunctionsSrc, frameworkFunctionsSrcExists, }: {
    featureFlags: any;
    functionsSrc: any;
    functionsSrcExists: any;
    internalFunctionsSrc: any;
    internalFunctionsSrcExists: any;
    frameworkFunctionsSrc: any;
    frameworkFunctionsSrcExists: any;
}): Promise<any[]>;
export function validateFunctionsSrc({ functionsSrc, relativeFunctionsSrc }: {
    functionsSrc: any;
    relativeFunctionsSrc: any;
}): Promise<boolean>;
