import { BaseFramework, Category } from './framework.js';
export class SvelteKit extends BaseFramework {
    id = 'svelte-kit';
    name = 'SvelteKit';
    npmDependencies = ['@sveltejs/kit'];
    category = Category.FrontendFramework;
    staticAssetsDirectory = 'static';
    dev = {
        command: 'vite dev',
        port: 5173,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'vite build',
        directory: 'build',
    };
    logo = {
        default: '/logos/svelte-kit/default.svg',
        light: '/logos/svelte-kit/default.svg',
        dark: '/logos/svelte-kit/default.svg',
    };
}
//# sourceMappingURL=svelte-kit.js.map