import crypto from 'crypto';
import fs from 'fs';
const getFileHash = (path) => {
    const hash = crypto.createHash('sha256');
    hash.setEncoding('hex');
    return new Promise((resolve, reject) => {
        const file = fs.createReadStream(path);
        file.on('end', () => {
            hash.end();
            resolve(hash.read());
        });
        file.on('error', reject);
        file.pipe(hash);
    });
};
export { getFileHash };
