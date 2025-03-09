import { SemVer } from 'semver';
import type { Project } from '../project.js';
export declare const enum PkgManager {
    YARN = "yarn",
    PNPM = "pnpm",
    BUN = "bun",
    NPM = "npm"
}
export type PkgManagerFields = {
    /** The package managers name that is used for logging */
    name: PkgManager;
    /** The package managers install command */
    installCommand: string;
    /** The package managers run command prefix */
    runCommand: string;
    /** The lock files a package manager is using */
    lockFiles: string[];
    /** Environment variable that can be used to force the usage of a package manager even though there is no lock file or a different lock file */
    forceEnvironment?: string;
    /** Flags that should be used for running the installation command */
    installFlags?: string[];
    /** A list of all cache locations for the package manager */
    cacheLocations?: string[];
    version?: SemVer;
};
/** The definition of all available package managers */
export declare const AVAILABLE_PACKAGE_MANAGERS: Record<PkgManager, PkgManagerFields>;
/**
 * Detects the used package manager based on
 * 1. packageManager field
 * 2. environment variable that forces the usage
 * 3. a lock file that is present in this directory or up in the tree for workspaces
 */
export declare const detectPackageManager: (project: Project) => Promise<PkgManagerFields | null>;
