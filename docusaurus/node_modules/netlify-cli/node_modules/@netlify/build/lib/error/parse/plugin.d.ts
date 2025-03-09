export declare const getPluginInfo: ({ pluginPackageJson }: {
    pluginPackageJson?: {} | undefined;
}, { packageName, loadedFrom }: {
    packageName: any;
    loadedFrom: any;
}) => string | undefined;
type pkgJSONData = {
    name?: string;
    bugs?: {
        url?: string;
    };
    repository?: {
        url?: string;
    };
};
export declare const getHomepage: (pluginPackageJson?: pkgJSONData, { loadedFrom }?: {
    loadedFrom?: string;
}) => string | undefined;
export {};
