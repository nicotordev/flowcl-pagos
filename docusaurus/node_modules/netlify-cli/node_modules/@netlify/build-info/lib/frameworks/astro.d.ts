import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Astro extends BaseFramework implements Framework {
    readonly id = "astro";
    name: string;
    configFiles: string[];
    npmDependencies: string[];
    category: Category;
    staticAssetsDirectory: string;
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
