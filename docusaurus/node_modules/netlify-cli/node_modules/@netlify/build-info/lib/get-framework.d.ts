import { DetectedFramework } from './frameworks/framework.js';
import { FrameworkName } from './frameworks/index.js';
import { Project } from './project.js';
/** Return some information about a framework used by a project. */
export declare function getFramework(frameworkId: FrameworkName, project: Project): Promise<DetectedFramework>;
