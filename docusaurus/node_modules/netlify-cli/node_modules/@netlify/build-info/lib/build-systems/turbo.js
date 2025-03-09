import { NPM_BUILD_SCRIPTS, NPM_DEV_SCRIPTS } from '../get-commands.js';
import { BaseBuildTool } from './build-system.js';
export class Turbo extends BaseBuildTool {
    id = 'turbo';
    name = 'TurboRepo';
    configFiles = ['turbo.json'];
    runFromRoot = true;
    logo = {
        default: '/logos/turbo/light.svg',
        light: '/logos/turbo/light.svg',
        dark: '/logos/turbo/dark.svg',
    };
    /** Retrieves a list of possible commands for a package */
    async getCommands(packagePath) {
        const { scripts, name } = await this.project.fs.readJSON(this.project.resolveFromPackage(packagePath, 'package.json'));
        if (name && scripts && Object.values(scripts).length) {
            return Object.keys(scripts).map((target) => {
                let type = 'unknown';
                if (NPM_DEV_SCRIPTS.includes(target)) {
                    type = 'dev';
                }
                if (NPM_BUILD_SCRIPTS.includes(target)) {
                    type = 'build';
                }
                return {
                    type,
                    command: `turbo run ${target} --filter ${name}`,
                };
            });
        }
        return [];
    }
}
//# sourceMappingURL=turbo.js.map