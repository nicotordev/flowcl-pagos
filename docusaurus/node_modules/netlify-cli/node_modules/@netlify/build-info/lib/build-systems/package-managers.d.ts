import { BaseBuildTool, Command } from './build-system.js';
export declare class PNPM extends BaseBuildTool {
    id: string;
    name: string;
    runFromRoot: boolean;
    getCommands(packagePath: string): Promise<Command[]>;
    detect(): Promise<this | undefined>;
}
export declare class Yarn extends BaseBuildTool {
    id: string;
    name: string;
    runFromRoot: boolean;
    getCommands(packagePath: string): Promise<Command[]>;
    detect(): Promise<this | undefined>;
}
export declare class NPM extends BaseBuildTool {
    id: string;
    name: string;
    runFromRoot: boolean;
    getCommands(packagePath: string): Promise<Command[]>;
    detect(): Promise<this | undefined>;
}
