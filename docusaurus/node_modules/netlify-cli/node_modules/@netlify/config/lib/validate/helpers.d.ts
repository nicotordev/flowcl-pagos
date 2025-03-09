export function isArrayOfObjects(value: any): value is Record<PropertyKey, unknown>[];
export function isArrayOfStrings(value: any): value is string[];
export function isString(value: any): value is string;
export function validProperties(propNames: any, legacyPropNames: any): {
    check: (value: any) => boolean;
    message: string;
};
export namespace functionsDirectoryCheck {
    function formatInvalid({ functionsDirectory }?: {}): {
        functions: {
            directory: any;
        };
    };
    let propertyName: string;
}
