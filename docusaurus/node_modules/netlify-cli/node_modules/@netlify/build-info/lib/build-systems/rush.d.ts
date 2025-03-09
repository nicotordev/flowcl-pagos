import { BaseBuildTool } from './build-system.js';
export declare class Rush extends BaseBuildTool {
    id: string;
    name: string;
    configFiles: string[];
    logo: {
        default: string;
        light: string;
        dark: string;
    };
}
