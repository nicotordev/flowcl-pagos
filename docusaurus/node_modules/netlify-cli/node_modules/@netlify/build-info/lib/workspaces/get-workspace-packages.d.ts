import { DirType } from '../file-system.js';
import type { Project } from '../project.js';
import type { WorkspacePackage } from './detect-workspace.js';
export type identifyPackageFn = (options: {
    project: Project;
    entry: string;
    type: DirType;
    packagePath: string;
    directory: string;
}) => Promise<WorkspacePackage | null>;
/** Find all packages inside a provided directory */
export declare function findPackages(project: Project, 
/**
 * The relative directory it should start checking.
 * If a jsWorkspaceRoot is set it will join it with it otherwise it tries to resolve based on the root
 */
dir: string, 
/** A function that identifies if a directory is a package. By default it checks if it has a package.json */
identifyPackage: identifyPackageFn, 
/** The depth to look. It can be either a single star `*` for one directory depth or a `**` for deep checking */
depth?: string): Promise<WorkspacePackage[]>;
/** Get a list of all workspace package paths (absolute paths) */
export declare function getWorkspacePackages(project: Project, patterns?: string[]): Promise<WorkspacePackage[]>;
