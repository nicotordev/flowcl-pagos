import { BaseFramework, Category } from './framework.js';
export class Grunt extends BaseFramework {
    id = 'grunt';
    name = 'Grunt';
    npmDependencies = ['grunt'];
    category = Category.BuildTool;
    build = {
        command: 'grunt build',
        directory: 'dist',
    };
    logo = {
        default: '/logos/grunt/default.svg',
        light: '/logos/grunt/default.svg',
        dark: '/logos/grunt/default.svg',
    };
}
//# sourceMappingURL=grunt.js.map