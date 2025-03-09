import { BaseFramework, Category, Framework } from './framework.js';
export declare class SvelteKit extends BaseFramework implements Framework {
    readonly id = "svelte-kit";
    name: string;
    npmDependencies: string[];
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
