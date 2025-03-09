import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Hydrogen extends BaseFramework implements Framework {
    readonly id = "hydrogen";
    name: string;
    npmDependencies: string[];
    configFiles: string[];
    category: Category;
    logo: {
        default: string;
        light: string;
        dark: string;
    };
    detect(): Promise<DetectedFramework | undefined>;
}
