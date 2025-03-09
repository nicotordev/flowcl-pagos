import { BaseBuildTool, type Command } from './build-system.js';
export declare class Turbo extends BaseBuildTool {
    id: string;
    name: string;
    configFiles: string[];
    runFromRoot: boolean;
    logo: {
        default: string;
        light: string;
        dark: string;
    };
    /** Retrieves a list of possible commands for a package */
    getCommands(packagePath: string): Promise<Command[]>;
}
