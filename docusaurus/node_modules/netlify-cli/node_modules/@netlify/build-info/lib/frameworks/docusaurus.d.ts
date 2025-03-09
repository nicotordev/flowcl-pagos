import { BaseFramework, Category, DetectedFramework, Detection, Framework } from './framework.js';
export declare class Docusaurus extends BaseFramework implements Framework {
    readonly id = "docusaurus";
    name: string;
    configFiles: string[];
    npmDependencies: string[];
    category: Category;
    staticAssetsDirectory: string;
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
    env: {
        BROWSER: string;
    };
    detect(): Promise<DetectedFramework | undefined>;
    isV1(detected: Detection): boolean;
}
