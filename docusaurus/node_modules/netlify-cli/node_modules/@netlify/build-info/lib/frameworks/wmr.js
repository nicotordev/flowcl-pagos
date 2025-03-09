import { BaseFramework, Category } from './framework.js';
export class WMR extends BaseFramework {
    id = 'wmr';
    name = 'WMR';
    npmDependencies = ['wmr'];
    category = Category.BuildTool;
    dev = {
        command: 'wmr',
        port: 8080,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'wmr build',
        directory: 'dist',
    };
    logo = {
        default: '/logos/wmr/default.svg',
        light: '/logos/wmr/default.svg',
        dark: '/logos/wmr/default.svg',
    };
}
//# sourceMappingURL=wmr.js.map