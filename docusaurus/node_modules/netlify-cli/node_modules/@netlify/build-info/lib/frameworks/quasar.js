import { BaseFramework, Category } from './framework.js';
export class Quasar extends BaseFramework {
    id = 'quasar';
    name = 'Quasar';
    npmDependencies = ['@quasar/app', 'quasar-cli'];
    category = Category.FrontendFramework;
    dev = {
        command: 'quasar dev -p 8081',
        port: 8081,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'quasar build',
        directory: 'dist/spa',
    };
    logo = {
        default: '/logos/quasar/default.svg',
        light: '/logos/quasar/default.svg',
        dark: '/logos/quasar/default.svg',
    };
    async detect() {
        await super.detect();
        if (this.detected) {
            if (this.isV017(this.detected)) {
                this.name = 'Quasar v0.17';
                this.build.directory = '.quasar';
                this.dev.command = 'quasar dev -p 8080';
                this.dev.port = 8080;
            }
            return this;
        }
    }
    isV017(detected) {
        return detected.package?.name === 'quasar-cli';
    }
}
//# sourceMappingURL=quasar.js.map