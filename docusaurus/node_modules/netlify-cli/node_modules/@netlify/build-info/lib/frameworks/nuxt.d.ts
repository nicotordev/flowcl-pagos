import { BaseFramework, Category, DetectedFramework, Detection, Framework } from './framework.js';
export declare class Nuxt extends BaseFramework implements Framework {
    readonly id = "nuxt";
    name: string;
    npmDependencies: string[];
    category: Category;
    dev: {
        command: string;
        port: number;
        pollingStrategies: {
            name: string;
        }[];
        clearPublishDirectory: boolean;
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
    isV3(detected: Detection): boolean;
}
