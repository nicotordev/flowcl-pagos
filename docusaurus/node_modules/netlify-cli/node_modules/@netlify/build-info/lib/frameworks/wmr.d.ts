import { BaseFramework, Category, Framework } from './framework.js';
export declare class WMR extends BaseFramework implements Framework {
    readonly id = "wmr";
    name: string;
    npmDependencies: string[];
    category: Category;
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
