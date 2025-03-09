import { type Framework } from '../frameworks/framework.js';
import { type Project } from '../project.js';
export type Settings = {
    /** A name that visualizes the settings */
    name: string;
    /** The build command that should be used to execute a build */
    buildCommand?: string;
    /** The dev command to serve the dev server */
    devCommand?: string;
    /** The port that needs to be listened on the dev server */
    frameworkPort?: number;
    /** the detected framework */
    framework: {
        id: string;
        name: string;
    };
    buildSystem?: {
        id: string;
        name: string;
    };
    /** Wether to clear the publish directory before local dev */
    clearPublishDirectory?: boolean;
    /** The dist directory that contains the build output */
    dist: string;
    env: Record<string, string | undefined>;
    /** Plugins installed via the netlify.toml */
    plugins_from_config_file: string[];
    /** Plugins that are detected via the framework detection and therefore recommended */
    plugins_recommended: string[];
    pollingStrategies: string[];
    /** The baseDirectory for the UI to configure (used to run the command in this working directory) */
    baseDirectory?: string;
    functionsDir?: string;
    /** the workspace package path of an app */
    packagePath?: string;
    template?: string;
};
/** Retrieve the settings for a framework, used inside the CLI in conjunction with getFramework */
export declare function getSettings(framework: Framework, project: Project, baseDirectory: string): Promise<Settings>;
/** Retrieves the build settings for a project */
export declare function getBuildSettings(project: Project, packagePath?: string): Promise<Settings[]>;
