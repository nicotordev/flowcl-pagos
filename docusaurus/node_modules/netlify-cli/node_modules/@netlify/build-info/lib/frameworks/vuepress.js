import { BaseFramework, Category } from './framework.js';
export class VuePress extends BaseFramework {
    id = 'vuepress';
    name = 'VuePress';
    npmDependencies = ['vuepress'];
    category = Category.SSG;
    dev = {
        command: 'vuepress dev',
        port: 8080,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'vuepress build',
        directory: '.vuepress/dist',
    };
    logo = {
        default: '/logos/vuepress/default.svg',
        light: '/logos/vuepress/default.svg',
        dark: '/logos/vuepress/default.svg',
    };
}
//# sourceMappingURL=vuepress.js.map