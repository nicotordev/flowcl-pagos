import { BaseFramework, Category, Framework } from './framework.js';
export declare class Svelte extends BaseFramework implements Framework {
    readonly id = "svelte";
    name: string;
    npmDependencies: string[];
    excludedNpmDependencies: string[];
    category: Category;
    staticAssetsDirectory: string;
    dev: {
        command: string;
        port: number;
        pollingStrategies: {
            name: string;
        }[];
    };
    build: {
        command: string;
        directory: string;
    };
    logo: {
        default: string;
        light: string;
        dark: string;
    };
}
