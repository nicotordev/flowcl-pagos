import { BaseFramework, Category, Framework } from './framework.js';
export declare class Gulp extends BaseFramework implements Framework {
    readonly id = "gulp";
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
