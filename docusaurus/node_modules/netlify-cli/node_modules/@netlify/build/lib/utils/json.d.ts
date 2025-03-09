import type { PackageJson } from 'read-package-up';
export type RootPackageJson = {
    name: string;
    version: string;
};
export declare const importJsonFile: (filePath: string) => Promise<PackageJson>;
export declare const ROOT_PACKAGE_JSON: RootPackageJson;
