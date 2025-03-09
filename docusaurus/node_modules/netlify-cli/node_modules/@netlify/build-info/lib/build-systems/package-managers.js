import { isNpmBuildScript, isNpmDevScript } from '../get-commands.js';
import { BaseBuildTool } from './build-system.js';
export class PNPM extends BaseBuildTool {
    id = 'pnpm';
    name = 'PNPM';
    runFromRoot = true;
    // will be called after the framework detection has run
    async getCommands(packagePath) {
        const { name, scripts } = await this.project.fs.readJSON(this.project.resolveFromPackage(packagePath, 'package.json'));
        if (scripts && Object.keys(scripts).length > 0) {
            return Object.entries(scripts).map(([scriptName, value]) => {
                const isBuild = isNpmBuildScript(scriptName, value);
                const isDev = isNpmDevScript(scriptName, value);
                return {
                    type: isDev ? 'dev' : isBuild ? 'build' : 'unknown',
                    // the ... in the command is telling pnpm to run all dependents first.
                    // but we should only do it for building
                    command: `pnpm --filter ${name}${isBuild ? '...' : ''} run ${scriptName}`,
                };
            });
        }
        return [];
    }
    async detect() {
        if (this.project.workspace && this.project.packageManager?.name === "pnpm" /* PkgManager.PNPM */) {
            return this;
        }
    }
}
export class Yarn extends BaseBuildTool {
    id = 'yarn';
    name = 'Yarn';
    runFromRoot = true;
    // will be called after the framework detection has run
    async getCommands(packagePath) {
        const { name, scripts } = await this.project.fs.readJSON(this.project.resolveFromPackage(packagePath, 'package.json'));
        if (scripts && Object.keys(scripts).length > 0) {
            return Object.entries(scripts).map(([scriptName, value]) => ({
                type: isNpmDevScript(scriptName, value) ? 'dev' : isNpmBuildScript(scriptName, value) ? 'build' : 'unknown',
                command: `yarn workspace ${name} ${scriptName}`,
            }));
        }
        return [];
    }
    async detect() {
        if (this.project.workspace && this.project.packageManager?.name === "yarn" /* PkgManager.YARN */) {
            return this;
        }
    }
}
export class NPM extends BaseBuildTool {
    id = 'npm';
    name = 'NPM';
    runFromRoot = true;
    // will be called after the framework detection has run
    async getCommands(packagePath) {
        const { name, scripts } = await this.project.fs.readJSON(this.project.resolveFromPackage(packagePath, 'package.json'));
        if (scripts && Object.keys(scripts).length > 0) {
            return Object.entries(scripts).map(([scriptName, value]) => ({
                type: isNpmDevScript(scriptName, value) ? 'dev' : isNpmBuildScript(scriptName, value) ? 'build' : 'unknown',
                command: `npm --workspace ${name} run ${scriptName}`,
            }));
        }
        return [];
    }
    async detect() {
        if (this.project.workspace && this.project.packageManager?.name === "npm" /* PkgManager.NPM */) {
            return this;
        }
    }
}
//# sourceMappingURL=package-managers.js.map