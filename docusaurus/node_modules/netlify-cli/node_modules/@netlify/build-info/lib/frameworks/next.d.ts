import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Next extends BaseFramework implements Framework {
    readonly id = "next";
    name: string;
    category: Category;
    npmDependencies: string[];
    excludedNpmDependencies: string[];
    configFiles: string[];
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
    detect(): Promise<DetectedFramework | undefined>;
}
