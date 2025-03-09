import { Buffer } from 'buffer';
import { rm } from 'fs/promises';
import { createRequire } from 'module';
import { platform } from 'process';
import { PassThrough } from 'stream';
import nock from 'nock';
import semver from 'semver';
import tmp from 'tmp-promise';
import { test, expect, vi } from 'vitest';
import { DenoBridge, DENO_VERSION_RANGE } from './bridge.js';
import { getPlatformTarget } from './platform.js';
const require = createRequire(import.meta.url);
const archiver = require('archiver');
test('Downloads the Deno CLI on demand and caches it for subsequent calls', async () => {
    var _a, _b, _c, _d;
    const latestVersion = (_b = (_a = semver.minVersion(DENO_VERSION_RANGE)) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : '';
    const mockBinaryOutput = `#!/usr/bin/env sh\n\necho "deno ${latestVersion}"`;
    const data = new PassThrough();
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(data);
    archive.append(Buffer.from(mockBinaryOutput), { name: platform === 'win32' ? 'deno.exe' : 'deno' });
    archive.finalize();
    const target = getPlatformTarget();
    const latestReleaseMock = nock('https://dl.deno.land').get('/release-latest.txt').reply(200, `v${latestVersion}`);
    const downloadMock = nock('https://dl.deno.land')
        .get(`/release/v${latestVersion}/deno-${target}.zip`)
        .reply(200, () => data);
    const tmpDir = await tmp.dir();
    const beforeDownload = vi.fn();
    const afterDownload = vi.fn();
    const deno = new DenoBridge({
        cacheDirectory: tmpDir.path,
        onBeforeDownload: beforeDownload,
        onAfterDownload: afterDownload,
        useGlobal: false,
    });
    const output1 = await deno.run(['help']);
    const output2 = await deno.run(['help']);
    const expectedOutput = /^deno [\d.]+/;
    expect(latestReleaseMock.isDone()).toBe(true);
    expect(downloadMock.isDone()).toBe(true);
    expect((_c = output1 === null || output1 === void 0 ? void 0 : output1.stdout) !== null && _c !== void 0 ? _c : '').toMatch(expectedOutput);
    expect((_d = output2 === null || output2 === void 0 ? void 0 : output2.stdout) !== null && _d !== void 0 ? _d : '').toMatch(expectedOutput);
    expect(beforeDownload).toHaveBeenCalledTimes(1);
    expect(afterDownload).toHaveBeenCalledTimes(1);
    await rm(tmpDir.path, { force: true, recursive: true, maxRetries: 10 });
});
