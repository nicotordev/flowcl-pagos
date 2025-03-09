import { BaseFramework, Category } from './framework.js';
export class Qwik extends BaseFramework {
    id = 'qwik';
    name = 'Qwik';
    npmDependencies = ['@builder.io/qwik'];
    category = Category.SSG;
    dev = {
        command: 'vite',
        port: 5173,
        pollingStrategies: [{ name: 'TCP' }],
    };
    logo = {
        default: '/logos/qwik/default.svg',
        light: '/logos/qwik/default.svg',
        dark: '/logos/qwik/default.svg',
    };
}
//# sourceMappingURL=qwik.js.map