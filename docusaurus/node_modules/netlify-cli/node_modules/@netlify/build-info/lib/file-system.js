import { DefaultLogger } from './logger.js';
/**
 * helper function to normalize path segments for a platform independent join
 * resolves . and .. elements in a path array with directory names
 *
 * @param allowAboveRoot is used for non absolute paths to go up
 */
function normalizePathSegments(parts, allowAboveRoot) {
    const res = [];
    for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        // ignore empty parts
        if (!p || p === '.')
            continue;
        if (p === '..') {
            if (res.length && res[res.length - 1] !== '..') {
                res.pop();
            }
            else if (allowAboveRoot) {
                res.push('..');
            }
        }
        else {
            res.push(p);
        }
    }
    return res;
}
/** A platform independent version of path.normalize()  */
export function normalize(path) {
    const isAbsolute = path.startsWith('/');
    const trailingSlash = path && path[path.length - 1] === '/';
    // Normalize the path
    path = normalizePathSegments(path.split('/'), !isAbsolute).join('/');
    if (!path && !isAbsolute) {
        path = '.';
    }
    if (path && trailingSlash) {
        path += '/';
    }
    return `${isAbsolute ? '/' : ''}${path}`;
}
/** A platform independent version of path.join() */
export function join(...segments) {
    let path = '';
    for (let i = 0, max = segments.length; i < max; i++) {
        if (typeof segments[i] !== 'string') {
            throw new TypeError('Arguments to join must be strings');
        }
        // replace all backslashes to forward slashes
        const segment = segments[i].replace(/\\/gm, '/');
        if (segment) {
            if (!path.length) {
                path += segment;
            }
            else {
                path += '/' + segment;
            }
        }
    }
    return normalize(path);
}
export class FileSystem {
    logger = new DefaultLogger('error');
    /** The current working directory will be set by the project */
    cwd = '/';
    /** returns the last portion of a path */
    basename(path) {
        return this.join(path).split('/').pop() || '';
    }
    /** returns the relative path from to based on the current working directory */
    relative(from, to) {
        const absoluteFrom = this.isAbsolute(from) ? from : this.join(this.cwd, from);
        const absoluteTo = this.isAbsolute(to) ? to : this.join(this.cwd, to);
        // if the paths are equal return an empty string
        if (absoluteFrom === absoluteTo) {
            return '';
        }
        const matching = [];
        if (absoluteTo.startsWith(absoluteFrom)) {
            // lazily matches a slash afterwards if it's a directory
            return absoluteTo.substring(absoluteFrom.length).replace(/^\//, '');
        }
        const fromParts = this.join(absoluteFrom).split('/');
        const toParts = this.join(absoluteTo).split('/');
        for (let i = 0, max = toParts.length; i < max; i++) {
            if (toParts[i] === fromParts?.[i]) {
                matching.push(toParts[i]);
            }
            else {
                break;
            }
        }
        // calculate how many dirs we need to go up from the to path
        const toUp = toParts.length - matching.length;
        const fromUp = fromParts.length - matching.length;
        // the max we have to go up
        const up = Math.max(toUp, fromUp);
        // if we have something from the 'from' to go up the max difference
        const result = fromUp > 0 ? Array(up).fill('..') : [];
        // if we have some parts left add them to the going up
        if (toUp > 0) {
            result.push(...toParts.slice(-toUp));
        }
        return result.join('/');
    }
    /** returns the directory name of a path */
    dirname(path) {
        const parts = this.join(path).split('/');
        parts.pop();
        // Preserve the initial slash if there was one.
        if (parts.length === 1 && parts[0] === '') {
            return '/';
        }
        return parts.join('/');
    }
    /** A platform independent version of path.join() */
    join(...segments) {
        return join(...segments);
    }
    /** Gracefully reads the file and returns null if it does not exist */
    async gracefullyReadFile(path) {
        try {
            return await this.readFile(path);
        }
        catch {
            return null;
        }
    }
    /** Gracefully reads a file as JSON and parses it */
    async readJSON(path, options = {}) {
        try {
            return JSON.parse(await this.readFile(path));
        }
        catch (error) {
            if (options.fail) {
                throw error;
            }
            let message = `Could not parse JSON file ${path}`;
            if (error instanceof Error) {
                message += `\n${error.name}: ${error.message}\n${error.stack}`;
            }
            this.logger.error(message);
            return {};
        }
    }
    /** Find a file or directory by walking up parent directories. */
    async findUp(name, options = {}) {
        let startDir = this.resolve(options.cwd || this.cwd);
        // function for a recursive call
        const readUp = async () => {
            const entries = await this.readDir(startDir, true);
            const found = Object.entries(entries).find(([entry, dirType]) => {
                if ((typeof name === 'string' && entry === name) || (Array.isArray(name) && name.includes(entry))) {
                    if (options.type) {
                        if (options.type === dirType) {
                            return entry;
                        }
                    }
                    return entry;
                }
            });
            // either found something or reached the root and nothing found
            if (found?.[0]) {
                return this.join(startDir, found[0]);
            }
            if (startDir === '/' || (options.stopAt && this.resolve(options.stopAt) === startDir)) {
                return;
            }
            startDir = this.join(startDir, '..');
            // recursive call to walk up
            return readUp();
        };
        return readUp();
    }
    /** Find files or directories by walking up parent directories. */
    async findUpMultiple(name, options = {}) {
        let startDir = this.resolve(options.cwd || this.cwd);
        const found = [];
        // function for a recursive call
        const readUp = async () => {
            const entries = await this.readDir(startDir, true);
            for (const [entry, dirType] of Object.entries(entries)) {
                if ((typeof name === 'string' && entry === name) || (Array.isArray(name) && name.includes(entry))) {
                    if ((options.type && options.type === dirType) || !options.type) {
                        found.push(this.resolve(startDir, entry));
                    }
                }
            }
            if (startDir === '/' || (options.stopAt && this.resolve(options.stopAt) === startDir)) {
                return found;
            }
            startDir = this.join(startDir, '..');
            // recursive call to walk up
            return readUp();
        };
        return readUp();
    }
}
//# sourceMappingURL=file-system.js.map