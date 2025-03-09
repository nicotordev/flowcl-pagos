import { BaseFramework, Category } from './framework.js';
export class Gulp extends BaseFramework {
    id = 'gulp';
    name = 'gulp.js';
    npmDependencies = ['gulp'];
    category = Category.BuildTool;
    build = {
        command: 'gulp build',
        directory: 'dist',
    };
    logo = {
        default: '/logos/gulp/default.svg',
        light: '/logos/gulp/default.svg',
        dark: '/logos/gulp/default.svg',
    };
}
//# sourceMappingURL=gulp.js.map