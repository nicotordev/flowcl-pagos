import type { Manifest } from '../node/manifest.js';
declare const testLogger: import("../node/logger.js").Logger;
declare const fixturesDir: string;
declare const useFixture: (fixtureName: string) => Promise<{
    basePath: string;
    cleanup: () => Promise<void>;
    distPath: string;
}>;
declare const getRouteMatcher: (manifest: Manifest) => (candidate: string) => import("../node/manifest.js").Route | undefined;
declare const runESZIP: (eszipPath: string, vendorDirectory?: string) => Promise<any>;
export { fixturesDir, getRouteMatcher, testLogger, runESZIP, useFixture };
