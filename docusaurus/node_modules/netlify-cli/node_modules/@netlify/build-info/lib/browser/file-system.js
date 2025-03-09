import { FileSystem } from '../file-system.js';
/** A sample implementation of a GitHub provider */
export class GithubProvider {
    repo;
    branch;
    constructor(repo, branch) {
        this.repo = repo;
        this.branch = branch;
    }
    async dir(filePath = '') {
        let path = `/repos/${this.repo}/contents${filePath}`;
        if (this.branch) {
            path += `?ref=${this.branch}`;
        }
        return this.request(path);
    }
    async read(filePath) {
        const headers = { Accept: 'application/vnd.github.VERSION.raw' };
        let path = `/repos/${this.repo}/contents${filePath}`;
        if (this.branch) {
            path += `?ref=${this.branch}`;
        }
        return this.request(path, headers);
    }
    async request(path, headers = {}) {
        const response = await fetch(new URL(path, `https://api.github.com`).href, { headers });
        if (response.headers?.get('Content-Type')?.match(/json/)) {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(JSON.stringify(json));
            }
            return json;
        }
        return response.text();
    }
}
/** A sample implementation of a web based file system that fetches from GitHub */
export class WebFS extends FileSystem {
    git;
    constructor(git) {
        super();
        this.git = git;
    }
    getEnvironment() {
        return "browser" /* Environment.Browser */;
    }
    isAbsolute(path) {
        return path.startsWith('/');
    }
    resolve(...paths) {
        const path = this.join(...paths);
        return this.isAbsolute(path) ? path : this.join(this.cwd, path);
    }
    async fileExists(path) {
        try {
            await this.readFile(path);
            return true;
        }
        catch {
            return false;
        }
    }
    async readDir(path, withFileTypes) {
        const result = await this.git.dir(this.resolve(path));
        if (!withFileTypes) {
            return result.map(({ path }) => path);
        }
        return result.reduce((prev, cur) => ({ ...prev, [cur.path]: cur.type === 'dir' ? 'directory' : 'file' }), {});
    }
    async readFile(path) {
        return this.git.read(this.resolve(path));
    }
}
//# sourceMappingURL=file-system.js.map