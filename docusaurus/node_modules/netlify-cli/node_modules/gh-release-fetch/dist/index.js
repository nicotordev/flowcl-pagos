import { promises as fs } from 'fs';
// @ts-expect-error this module does not have types itself, we need to use `download` types
import download from '@xhmikosr/downloader';
import fetch from 'node-fetch';
import { gt } from 'semver';
const versionPrefixRegex = /^v/;
export async function fetchLatest(release, fetchOptions) {
    // eslint-disable-next-line no-param-reassign
    release.version = await resolveRelease(release.repository, fetchOptions);
    const agent = fetchOptions && fetchOptions.agent;
    return fetchVersion(release, { agent });
}
export async function fetchVersion(release, { agent } = {}) {
    validateRelease(release);
    await downloadFile(release, { agent });
}
export async function updateAvailable(repository, currentVersion, fetchOptions) {
    const latestVersion = await resolveRelease(repository, fetchOptions);
    return newerVersion(latestVersion, currentVersion);
}
async function resolveRelease(repository, fetchOptions) {
    const res = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, fetchOptions);
    const json = (await res.json());
    if (res.status === 403 && typeof json.message === 'string' && json.message.includes('API rate limit exceeded')) {
        throw new Error('API rate limit exceeded, please try again later');
    }
    return json.tag_name;
}
async function downloadFile(release, { agent }) {
    const url = `https://github.com/${release.repository}/releases/download/${release.version}/${release.package}`;
    await fs.mkdir(release.destination, { recursive: true });
    await download(url, release.destination, {
        extract: release.extract,
        got: {
            agent: { https: agent },
        },
    });
}
function validateRelease(release) {
    if (!release.repository) {
        throw new Error('Missing release repository');
    }
    if (!release.package) {
        throw new Error('Missing release package name');
    }
    if (!release.destination) {
        throw new Error('Missing release destination');
    }
    if (!release.version) {
        throw new Error('Missing release version');
    }
}
export function newerVersion(latestVersion, currentVersion) {
    if (!latestVersion) {
        return false;
    }
    if (!currentVersion) {
        return true;
    }
    const normalizedLatestVersion = latestVersion.replace(versionPrefixRegex, '');
    const normalizedCurrentVersion = currentVersion.replace(versionPrefixRegex, '');
    return gt(normalizedLatestVersion, normalizedCurrentVersion);
}
