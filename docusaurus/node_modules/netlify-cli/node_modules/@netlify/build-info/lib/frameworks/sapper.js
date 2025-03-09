import { BaseFramework, Category } from './framework.js';
export class Sapper extends BaseFramework {
    id = 'sapper';
    name = 'Sapper';
    npmDependencies = ['sapper'];
    category = Category.FrontendFramework;
    staticAssetsDirectory = 'static';
    dev = {
        command: 'sapper dev',
        port: 3000,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'sapper export',
        directory: '__sapper__/export',
    };
    logo = {
        default: '/logos/sapper/default.svg',
        light: '/logos/sapper/default.svg',
        dark: '/logos/sapper/default.svg',
    };
}
//# sourceMappingURL=sapper.js.map