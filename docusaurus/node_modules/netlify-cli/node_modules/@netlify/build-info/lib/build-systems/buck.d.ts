import { BaseBuildTool } from './build-system.js';
export declare class Buck extends BaseBuildTool {
    id: string;
    name: string;
    configFiles: string[];
    detect(): Promise<this | undefined>;
}
