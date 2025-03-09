import { BaseFramework, Category } from './framework.js';
export class DocPad extends BaseFramework {
    id = 'docpad';
    name = 'DocPad';
    npmDependencies = ['docpad'];
    category = Category.SSG;
    dev = {
        command: 'docpad run',
        port: 9778,
        pollingStrategies: [{ name: 'TCP' }],
    };
    build = {
        command: 'docpad generate',
        directory: 'out',
    };
}
//# sourceMappingURL=docpad.js.map