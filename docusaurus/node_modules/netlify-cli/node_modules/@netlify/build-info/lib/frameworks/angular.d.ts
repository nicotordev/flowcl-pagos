import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Angular extends BaseFramework implements Framework {
    readonly id = "angular";
    name: string;
    configFiles: string[];
    npmDependencies: string[];
    excludedNpmDependencies: string[];
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
    detect(): Promise<DetectedFramework | undefined>;
}
