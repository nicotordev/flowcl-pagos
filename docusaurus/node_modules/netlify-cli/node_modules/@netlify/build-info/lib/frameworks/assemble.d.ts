import { BaseFramework, Category, Framework } from './framework.js';
export declare class Assemble extends BaseFramework implements Framework {
    readonly id = "assemble";
    name: string;
    npmDependencies: string[];
    category: Category;
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
