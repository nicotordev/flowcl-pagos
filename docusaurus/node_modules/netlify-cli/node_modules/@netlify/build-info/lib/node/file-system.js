import { promises as fs } from 'fs';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'path';
import { findUp, findUpMultiple } from 'find-up';
import { FileSystem } from '../file-system.js';
export class NodeFS extends FileSystem {
    constructor() {
        super();
        this.cwd = process.cwd();
    }
    getEnvironment() {
        return "node" /* Environment.Node */;
    }
    isAbsolute(path) {
        return isAbsolute(path);
    }
    dirname(path) {
        return dirname(path);
    }
    resolve(...paths) {
        return resolve(...paths);
    }
    relative(from, to) {
        return relative(from, to);
    }
    basename(path) {
        return basename(path);
    }
    join(...segments) {
        return join(...segments);
    }
    async fileExists(path) {
        try {
            await fs.stat(resolve(path));
            return true;
        }
        catch {
            return false;
        }
    }
    async readDir(path, withFileTypes) {
        try {
            if (!withFileTypes) {
                return fs.readdir(resolve(path));
            }
            const result = await fs.readdir(resolve(path), { withFileTypes: true });
            return result.reduce((prev, cur) => ({ ...prev, [cur.name]: cur.isDirectory() ? 'directory' : 'file' }), {});
        }
        catch {
            return [];
        }
    }
    async readFile(path) {
        return (await fs.readFile(resolve(path), 'utf-8')).toString();
    }
    /** Node implementation of finding a file or directory by walking up parent directories. */
    findUp(name, options = {}) {
        return findUp(name, options);
    }
    /** Node implementation of finding files or directories by walking up parent directories. */
    findUpMultiple(name, options = {}) {
        return findUpMultiple(name, options);
    }
}
//# sourceMappingURL=file-system.js.map