import { BaseFramework, Category, Framework } from './framework.js';
export declare class TanStackRouter extends BaseFramework implements Framework {
    readonly id = "tanstack-router";
    name: string;
    npmDependencies: string[];
    excludedNpmDependencies: string[];
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
