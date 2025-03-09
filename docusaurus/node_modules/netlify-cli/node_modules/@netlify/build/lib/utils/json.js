import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
const ROOT_PACKAGE_JSON_PATH = fileURLToPath(new URL('../../package.json', import.meta.url));
// TODO: Replace with dynamic `import()` once it is supported without
// experimental flags
export const importJsonFile = async function (filePath) {
    const fileContents = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
};
export const ROOT_PACKAGE_JSON = (await importJsonFile(ROOT_PACKAGE_JSON_PATH));
