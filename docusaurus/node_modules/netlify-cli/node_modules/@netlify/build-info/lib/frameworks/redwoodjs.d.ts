import { BaseFramework, Category, Framework } from './framework.js';
export declare class RedwoodJS extends BaseFramework implements Framework {
    readonly id = "redwoodjs";
    name: string;
    npmDependencies: string[];
    configFiles: string[];
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
    env: {
        AWS_LAMBDA_JS_RUNTIME: string;
        NODE_VERSION: string;
    };
    logo: {
        default: string;
        light: string;
        dark: string;
    };
}
