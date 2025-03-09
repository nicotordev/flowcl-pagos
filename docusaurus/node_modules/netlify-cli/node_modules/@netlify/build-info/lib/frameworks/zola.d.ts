import { BaseFramework, Category, Framework } from './framework.js';
export declare class Zola extends BaseFramework implements Framework {
    readonly id = "zola";
    name: string;
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
}
