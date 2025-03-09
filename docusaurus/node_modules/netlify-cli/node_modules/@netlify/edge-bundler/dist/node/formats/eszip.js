import { join } from 'path';
import { pathToFileURL } from 'url';
import { virtualRoot, virtualVendorRoot } from '../../shared/consts.js';
import { BundleFormat } from '../bundle.js';
import { wrapBundleError } from '../bundle_error.js';
import { wrapNpmImportError } from '../npm_import_error.js';
import { getPackagePath } from '../package_json.js';
import { getFileHash } from '../utils/sha256.js';
const bundleESZIP = async ({ basePath, buildID, debug, deno, distDirectory, externals, functions, importMap, vendorDirectory, }) => {
    const extension = '.eszip';
    const destPath = join(distDirectory, `${buildID}${extension}`);
    const importMapPrefixes = {
        [`${pathToFileURL(basePath)}/`]: virtualRoot,
    };
    if (vendorDirectory !== undefined) {
        importMapPrefixes[`${pathToFileURL(vendorDirectory)}/`] = virtualVendorRoot;
    }
    const { bundler, importMap: bundlerImportMap } = getESZIPPaths();
    const importMapData = JSON.stringify(importMap.getContents(importMapPrefixes));
    const payload = {
        basePath,
        destPath,
        externals,
        functions,
        importMapData,
        vendorDirectory,
    };
    const flags = ['--allow-all', '--no-config', `--import-map=${bundlerImportMap}`];
    if (!debug) {
        flags.push('--quiet');
    }
    try {
        await deno.run(['run', ...flags, bundler, JSON.stringify(payload)], { pipeOutput: true });
    }
    catch (error) {
        throw wrapBundleError(wrapNpmImportError(error), {
            format: 'eszip',
        });
    }
    const hash = await getFileHash(destPath);
    return { extension, format: BundleFormat.ESZIP2, hash };
};
const getESZIPPaths = () => {
    const denoPath = join(getPackagePath(), 'deno');
    return {
        bundler: join(denoPath, 'bundle.ts'),
        importMap: join(denoPath, 'vendor', 'import_map.json'),
    };
};
export { bundleESZIP as bundle };
