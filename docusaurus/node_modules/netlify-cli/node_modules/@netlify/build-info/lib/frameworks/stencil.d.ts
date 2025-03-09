import { BaseFramework, Category, Framework } from './framework.js';
export declare class Stencil extends BaseFramework implements Framework {
    readonly id = "stencil";
    name: string;
    npmDependencies: string[];
    configFiles: string[];
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
    env: {
        BROWSER: string;
        PORT: string;
    };
}
