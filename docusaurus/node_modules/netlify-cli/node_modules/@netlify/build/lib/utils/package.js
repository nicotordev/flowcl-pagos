import { dirname } from 'path';
import { readPackageUp } from 'read-package-up';
/**
 * Retrieve `package.json` from a specific directory
 */
export const getPackageJson = async function (cwd, options = {}) {
    const result = {
        packageJson: {},
    };
    try {
        const readResult = await readPackageUp({
            cwd,
            ...Object.assign({ normalize: true }, options),
        });
        if (readResult) {
            result.packageJson = readResult.packageJson;
            result.packageDir = dirname(readResult.path);
        }
    }
    catch {
        // continue regardless error
    }
    return result;
};
