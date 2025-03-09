import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class ReactRouter extends BaseFramework implements Framework {
    readonly id = "react-router";
    name: string;
    npmDependencies: string[];
    configFiles: string[];
    category: Category;
    dev: {
        port: number;
        command: string;
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
