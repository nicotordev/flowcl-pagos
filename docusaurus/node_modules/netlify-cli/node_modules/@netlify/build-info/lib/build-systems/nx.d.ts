import { BaseBuildTool, type Command } from './build-system.js';
type Target = WorkspaceJsonTarget | ProjectJsonTarget;
type WorkspaceJsonTarget = {
    /** will be manually set */
    name: string;
    builder: string;
    options?: Record<string, any>;
    configurations?: Record<string, any>;
};
type ProjectJsonTarget = {
    /** will be manually set */
    name: string;
    executor: string;
    outputs?: string[];
    options?: Record<string, any>;
    defaultConfiguration?: string;
    configurations?: Record<string, any>;
};
export declare class Nx extends BaseBuildTool {
    id: string;
    name: string;
    configFiles: string[];
    logo: {
        default: string;
        light: string;
        dark: string;
    };
    runFromRoot: boolean;
    /**
     * if it's an nx integrated setup
     * We need to differentiate as the 'dist' folder is located differently
     * @see https://nx.dev/concepts/integrated-vs-package-based
     */
    isIntegrated: boolean;
    /** List of target patterns */
    targets: Map<string, Target[]>;
    /** Retrieves a list of possible commands for a package */
    getCommands(packagePath: string): Promise<Command[]>;
    /** Retrieve the dist directory of a package */
    getDist(packagePath: string): Promise<string | null>;
    /** Retrieve the overridden port of the nx executor for integrated setups */
    getPort(packagePath: string): Promise<number | null>;
    private getOutputFromTarget;
    private getExecutorFromTarget;
    /** Detects a framework through the executor field in a target */
    private detectFramework;
    /** detect workspace packages with the workspace.json file */
    private detectWorkspaceFile;
    /** detect workspace packages with the project.json files */
    private detectProjectJson;
    detect(): Promise<this | undefined>;
}
export {};
