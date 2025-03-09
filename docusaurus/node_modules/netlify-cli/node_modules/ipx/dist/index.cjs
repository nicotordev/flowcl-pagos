'use strict';

const nodeFs = require('./shared/ipx.7601f01b.cjs');
const h3 = require('h3');
require('defu');
require('ufo');
require('image-meta');
require('destr');
require('@fastify/accept-negotiator');
require('etag');
require('ofetch');
require('pathe');

function unstorageToIPXStorage(storage, _options = {}) {
  const options = typeof _options === "string" ? { prefix: _options } : _options;
  const resolveKey = (id) => options.prefix ? `${options.prefix}:${id}` : id;
  return {
    name: "ipx:" + (storage.name || "unstorage"),
    async getMeta(id, opts = {}) {
      if (!storage.getMeta) {
        return;
      }
      const storageKey = resolveKey(id);
      const meta = await storage.getMeta(storageKey, opts);
      return meta;
    },
    async getData(id, opts = {}) {
      if (!storage.getItemRaw) {
        return;
      }
      const storageKey = resolveKey(id);
      let data = await storage.getItemRaw(storageKey, opts);
      if (!data) {
        return;
      }
      if (data instanceof Blob) {
        data = await data.arrayBuffer();
      }
      try {
        return Buffer.from(data);
      } catch (error) {
        throw h3.createError({
          statusCode: 500,
          statusText: `IPX_STORAGE_ERROR`,
          message: `Failed to parse storage data to Buffer:
${error.message}`,
          cause: error
        });
      }
    }
  };
}

exports.createIPX = nodeFs.createIPX;
exports.createIPXH3App = nodeFs.createIPXH3App;
exports.createIPXH3Handler = nodeFs.createIPXH3Handler;
exports.createIPXNodeServer = nodeFs.createIPXNodeServer;
exports.createIPXPlainServer = nodeFs.createIPXPlainServer;
exports.createIPXWebServer = nodeFs.createIPXWebServer;
exports.ipxFSStorage = nodeFs.ipxFSStorage;
exports.ipxHttpStorage = nodeFs.ipxHttpStorage;
exports.unstorageToIPXStorage = unstorageToIPXStorage;
