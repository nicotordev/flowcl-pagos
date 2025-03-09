import { BaseFramework, Category, type DetectedFramework, type Framework } from './framework.js';
export declare class SolidStart extends BaseFramework implements Framework {
    readonly id = "solid-start";
    name: string;
    npmDependencies: string[];
    category: Category;
    dev: {
        command: string;
        port: number;
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
