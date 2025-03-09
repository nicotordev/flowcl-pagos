import { Project } from '../project.js';
import { NodeFS } from './file-system.js';
/** A noop logger that is used to not log anything (we use the stdout for parsing the json output) */
export class NoopLogger {
    debug() {
        /** noop */
    }
    log() {
        /** noop */
    }
    error() {
        /** noop */
    }
    info() {
        /** noop */
    }
    warn() {
        /** noop */
    }
}
/** Get the build info object that is used inside buildbot */
export async function getBuildInfo(config = { featureFlags: {} }) {
    const fs = new NodeFS();
    // prevent logging in output as we use the stdout to capture the json
    fs.logger = new NoopLogger();
    const project = new Project(fs, config.projectDir, config.rootDir)
        .setBugsnag(config.bugsnagClient)
        .setEnvironment(process.env)
        .setNodeVersion(process.version);
    const info = {};
    // we are only interested in the frameworks of the base directory here (as they are for this site)
    info.frameworks = (await project.detectFrameworksInPath(project.baseDirectory)) || [];
    info.settings = await project.getBuildSettings();
    info.langRuntimes = await project.detectRuntime();
    // some framework detection like NX can update the workspace in the project so assign it later on
    info.jsWorkspaces = project.workspace;
    info.buildSystems = project.buildSystems;
    info.packageManager = project.packageManager;
    return info;
}
//# sourceMappingURL=get-build-info.js.map