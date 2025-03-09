import { FileSystem } from '../file-system.js';
import { Project } from '../project.js';
import { Settings } from './get-build-settings.js';
export declare function getTomlSettingsFromPath(fs: FileSystem, directory: string): Promise<Partial<Settings> | undefined>;
export declare function getTomlSettings(project: Project, configFilePath?: string): Promise<Partial<Settings>>;
