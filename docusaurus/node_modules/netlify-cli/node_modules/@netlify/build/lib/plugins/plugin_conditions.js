import { join } from 'path';
import _pEvery from 'p-every';
import semver from 'semver';
import { importJsonFile } from '../utils/json.js';
import { resolvePath } from '../utils/resolve.js';
// the types of that package seem to be not correct and demand a `pEvery.default()` usage which is wrong
const pEvery = _pEvery;
/**
 * Plugins can use `compatibility.{version}.nodeVersion: 'allowedNodeVersion'`
 * to deliver different plugin versions based on the Node.js version
 */
const nodeVersionTest = (allowedNodeVersion, { nodeVersion }) => semver.satisfies(nodeVersion, allowedNodeVersion);
const nodeVersionWarning = (allowedNodeVersion) => `Node.js ${allowedNodeVersion}`;
const siteDependenciesTest = async function (allowedSiteDependencies, { packageJson: { devDependencies = {}, dependencies = {} }, packagePath, buildDir }) {
    let siteDependencies = { ...devDependencies, ...dependencies };
    // If there is a packagePath in a mono repository add the dependencies from the package as well
    // the packageJson is in this case only the top root package json which does not contain all the dependencies to test for
    const pkgJsonPath = packagePath && join(buildDir, packagePath, 'package.json');
    if (pkgJsonPath) {
        try {
            const { devDependencies: devDepsPgk = {}, dependencies: depsPkg = {} } = await importJsonFile(pkgJsonPath);
            siteDependencies = { ...siteDependencies, ...devDepsPgk, ...depsPkg };
        }
        catch {
            // noop
        }
    }
    return await pEvery(Object.entries(allowedSiteDependencies), ([dependencyName, allowedVersion]) => siteDependencyTest({ dependencyName, allowedVersion, siteDependencies, buildDir }));
};
const siteDependencyTest = async function ({ dependencyName, allowedVersion, siteDependencies, buildDir, }) {
    const siteDependency = siteDependencies[dependencyName];
    if (typeof siteDependency !== 'string') {
        return false;
    }
    // if this is a valid version we can apply the rule directly
    if (semver.clean(siteDependency) !== null) {
        return semver.satisfies(siteDependency, allowedVersion, { includePrerelease: true });
    }
    try {
        // if this is a range we need to get the exact version
        const packageJsonPath = await resolvePath(`${dependencyName}/package.json`, buildDir);
        const { version } = await importJsonFile(packageJsonPath);
        if (!version) {
            return false;
        }
        return semver.satisfies(version, allowedVersion);
    }
    catch {
        return false;
    }
};
const siteDependenciesWarning = function (allowedSiteDependencies) {
    return Object.entries(allowedSiteDependencies).map(siteDependencyWarning).join(',');
};
const siteDependencyWarning = function ([dependencyName, allowedVersion]) {
    return `${dependencyName}@${allowedVersion}`;
};
export const CONDITIONS = {
    nodeVersion: { test: nodeVersionTest, warning: nodeVersionWarning },
    siteDependencies: { test: siteDependenciesTest, warning: siteDependenciesWarning },
};
