import { Project } from '../project.js';
export type Command = {
    type: 'build' | 'dev' | 'unknown';
    command: string;
};
export interface BuildSystem {
    id: string;
    name: string;
    project: Project;
    version?: string;
    /** If the command should be executed from the repository root */
    runFromRoot?: boolean;
    /** A function that can be implemented to override the dev and build commands of a framework like `nx run ...` */
    getCommands?(path: string): Promise<Command[]>;
    /** A function that can be implemented to override the dist location of a framework */
    getDist?(path: string): Promise<string>;
    /** A function that can be implemented to override the framework port */
    getPort?(path: string): Promise<number | null>;
    /** The detect function that is called to check if this build system is in use */
    detect(): Promise<BuildSystem | undefined>;
}
export declare abstract class BaseBuildTool {
    project: Project;
    id: string;
    name: string;
    version?: string;
    configFiles: string[];
    /** If the command should be executed from the repository root */
    runFromRoot?: boolean;
    logo?: {
        default: string;
        light?: string;
        dark?: string;
    };
    constructor(project: Project);
    detect(): Promise<this | undefined>;
    /** Gets a JSON from the class information */
    toJSON(): {
        id: string;
        name: string;
        version: string | undefined;
        logo: {} | undefined;
    };
}
