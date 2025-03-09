import { Project } from '../project.js';
export declare abstract class LangRuntime {
    project: Project;
    id: string;
    name: string;
    configFiles: string[];
    constructor(project: Project);
    detect(): Promise<this | undefined>;
    toJSON(): {
        id: string;
        name: string;
    };
}
