export class BaseBuildTool {
    project;
    id;
    name;
    version;
    configFiles = [];
    /** If the command should be executed from the repository root */
    runFromRoot;
    logo;
    constructor(project) {
        this.project = project;
    }
    async detect() {
        const config = await this.project.fs.findUp(this.configFiles, {
            cwd: this.project.baseDirectory,
            stopAt: this.project.root,
        });
        if (config) {
            const pkgJson = await this.project.getPackageJSON(this.project.fs.dirname(config));
            this.version = pkgJson.devDependencies?.[this.id];
            return this;
        }
    }
    /** Gets a JSON from the class information */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            version: this.version,
            logo: this.logo
                ? Object.entries(this.logo).reduce((prev, [key, value]) => ({ ...prev, [key]: `https://framework-info.netlify.app${value}` }), {})
                : undefined,
        };
    }
}
//# sourceMappingURL=build-system.js.map