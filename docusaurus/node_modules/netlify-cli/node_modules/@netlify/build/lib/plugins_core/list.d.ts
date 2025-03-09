export function listCorePlugins({ FUNCTIONS_SRC }: {
    FUNCTIONS_SRC: any;
}): ({
    package: string;
    pluginPath: string;
    optional: boolean;
} | undefined)[];
export function isCorePlugin(packageName: any): boolean;
