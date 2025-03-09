import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { isFileNotFoundError } from './utils/error.js';
export const load = async (path, logger) => {
    if (path === undefined) {
        return {
            declarations: [],
            layers: [],
        };
    }
    try {
        const data = await fs.readFile(path, 'utf8');
        const config = JSON.parse(data);
        return parse(config, path);
    }
    catch (error) {
        if (!isFileNotFoundError(error)) {
            logger.system('Error while parsing internal edge functions manifest:', error);
        }
    }
    return {
        declarations: [],
        layers: [],
    };
};
const parse = (data, path) => {
    var _a, _b;
    if (data.version !== 1) {
        throw new Error(`Unsupported file version: ${data.version}`);
    }
    const config = {
        declarations: (_a = data.functions) !== null && _a !== void 0 ? _a : [],
        layers: (_b = data.layers) !== null && _b !== void 0 ? _b : [],
    };
    if (data.import_map) {
        const importMapPath = resolve(dirname(path), data.import_map);
        config.importMap = importMapPath;
    }
    return config;
};
