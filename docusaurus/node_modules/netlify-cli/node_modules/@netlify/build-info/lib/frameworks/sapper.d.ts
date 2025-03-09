import { BaseFramework, Category, Framework } from './framework.js';
export declare class Sapper extends BaseFramework implements Framework {
    readonly id = "sapper";
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
