import { BaseFramework, Category, DetectedFramework, Detection, Framework } from './framework.js';
export declare class Quasar extends BaseFramework implements Framework {
    readonly id = "quasar";
    name: string;
    npmDependencies: string[];
    category: Category;
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
    detect(): Promise<DetectedFramework | undefined>;
    isV017(detected: Detection): boolean;
}
