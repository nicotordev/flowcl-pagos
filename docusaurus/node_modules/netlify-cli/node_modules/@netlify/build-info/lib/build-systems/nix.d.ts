import { BaseBuildTool } from './build-system.js';
export declare class Nix extends BaseBuildTool {
    id: string;
    name: string;
    configFiles: string[];
    detect(): Promise<this | undefined>;
}
