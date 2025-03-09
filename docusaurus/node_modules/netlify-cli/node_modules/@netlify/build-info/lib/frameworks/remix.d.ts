import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Remix extends BaseFramework implements Framework {
    readonly id = "remix";
    name: string;
    npmDependencies: string[];
    excludedNpmDependencies: string[];
    configFiles: string[];
    category: Category;
    logo: {
        default: string;
        light: string;
        dark: string;
    };
    detect(): Promise<DetectedFramework | undefined>;
}
