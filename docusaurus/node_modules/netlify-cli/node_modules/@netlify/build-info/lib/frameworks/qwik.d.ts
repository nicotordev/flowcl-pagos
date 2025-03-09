import { BaseFramework, Category, Framework } from './framework.js';
export declare class Qwik extends BaseFramework implements Framework {
    readonly id = "qwik";
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
    logo: {
        default: string;
        light: string;
        dark: string;
    };
}
