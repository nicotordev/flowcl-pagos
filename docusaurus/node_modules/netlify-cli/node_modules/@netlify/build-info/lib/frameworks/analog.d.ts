import { BaseFramework, Category, Framework } from './framework.js';
export declare class Analog extends BaseFramework implements Framework {
    readonly id = "analog";
    name: string;
    configFiles: never[];
    npmDependencies: string[];
    category: Category;
    dev: {
        port: number;
        command: string;
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
