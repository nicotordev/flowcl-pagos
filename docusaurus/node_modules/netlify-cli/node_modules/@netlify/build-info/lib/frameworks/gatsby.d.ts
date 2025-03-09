import { BaseFramework, Category, DetectedFramework, Framework } from './framework.js';
export declare class Gatsby extends BaseFramework implements Framework {
    readonly id = "gatsby";
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
        GATSBY_LOGGER: string;
        GATSBY_PRECOMPILE_DEVELOP_FUNCTIONS: string;
        AWS_LAMBDA_JS_RUNTIME: string;
        NODE_VERSION: string;
    };
    detect(): Promise<DetectedFramework | undefined>;
}
