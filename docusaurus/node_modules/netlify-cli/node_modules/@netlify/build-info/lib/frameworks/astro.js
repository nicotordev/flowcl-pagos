import { lt } from 'semver';
import { BaseFramework, Category } from './framework.js';
export class Astro extends BaseFramework {
    id = 'astro';
    name = 'Astro';
    configFiles = ['astro.config.mjs'];
    npmDependencies = ['astro'];
    category = Category.SSG;
    staticAssetsDirectory = 'public';
    dev = {
        port: 4321,
        command: 'astro dev',
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'astro build',
        directory: 'dist',
    };
    logo = {
        default: '/logos/astro/light.svg',
        light: '/logos/astro/light.svg',
        dark: '/logos/astro/dark.svg',
    };
    async detect() {
        await super.detect();
        if (this.detected) {
            // Less than 3.x.x. uses port 3000
            if (this.version && lt(this.version, '3.0.0')) {
                this.dev.port = 3000;
            }
            return this;
        }
    }
}
//# sourceMappingURL=astro.js.map