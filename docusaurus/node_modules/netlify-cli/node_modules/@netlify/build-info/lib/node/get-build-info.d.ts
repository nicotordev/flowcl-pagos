import { Client } from '@bugsnag/js';
import { DetectedFramework } from '../frameworks/framework.js';
import { Logger } from '../logger.js';
import { PkgManagerFields } from '../package-managers/detect-package-manager.js';
import { Settings } from '../settings/get-build-settings.js';
import { WorkspaceInfo } from '../workspaces/detect-workspace.js';
export type Info = {
    jsWorkspaces: WorkspaceInfo | null;
    packageManager: PkgManagerFields | null;
    frameworks: DetectedFramework[];
    settings: Settings[];
    buildSystems: {
        name: string;
        version?: string | undefined;
    }[];
    langRuntimes: {
        name: string;
    }[];
};
/** A noop logger that is used to not log anything (we use the stdout for parsing the json output) */
export declare class NoopLogger implements Logger {
    debug(): void;
    log(): void;
    error(): void;
    info(): void;
    warn(): void;
}
/** Get the build info object that is used inside buildbot */
export declare function getBuildInfo(config?: {
    projectDir?: string;
    rootDir?: string;
    featureFlags?: Record<string, boolean>;
    bugsnagClient?: Client;
}): Promise<Info>;
