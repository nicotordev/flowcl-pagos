import { DenoBridge } from '../bridge.js';
import { Bundle } from '../bundle.js';
import { EdgeFunction } from '../edge_function.js';
import { FeatureFlags } from '../feature_flags.js';
import { ImportMap } from '../import_map.js';
interface BundleESZIPOptions {
    basePath: string;
    buildID: string;
    debug?: boolean;
    deno: DenoBridge;
    distDirectory: string;
    externals: string[];
    featureFlags: FeatureFlags;
    functions: EdgeFunction[];
    importMap: ImportMap;
    vendorDirectory?: string;
}
declare const bundleESZIP: ({ basePath, buildID, debug, deno, distDirectory, externals, functions, importMap, vendorDirectory, }: BundleESZIPOptions) => Promise<Bundle>;
export { bundleESZIP as bundle };
