export class LangRuntime {
    project;
    id;
    name;
    configFiles = [];
    constructor(project) {
        this.project = project;
    }
    async detect() {
        const config = await this.project.fs.findUp(this.configFiles, {
            cwd: this.project.baseDirectory,
            stopAt: this.project.root,
        });
        if (config) {
            return this;
        }
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
//# sourceMappingURL=runtime.js.map