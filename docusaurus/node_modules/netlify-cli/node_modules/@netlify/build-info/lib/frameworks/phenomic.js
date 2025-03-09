import { BaseFramework, Category } from './framework.js';
export class Phenomic extends BaseFramework {
    id = 'phenomic';
    name = 'Phenomic';
    npmDependencies = ['@phenomic/core'];
    category = Category.SSG;
    dev = {
        command: 'phenomic start',
        port: 3333,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'phenomic build',
        directory: 'public',
    };
    logo = {
        default: '/logos/phenomic/default.svg',
        light: '/logos/phenomic/default.svg',
        dark: '/logos/phenomic/default.svg',
    };
}
//# sourceMappingURL=phenomic.js.map