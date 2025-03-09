export { c as createIPX, b as createIPXH3App, a as createIPXH3Handler, e as createIPXNodeServer, f as createIPXPlainServer, d as createIPXWebServer, g as ipxFSStorage, i as ipxHttpStorage } from './shared/ipx.b027cc1c.mjs';
import { createError } from 'h3';
import 'defu';
import 'ufo';
import 'image-meta';
import 'destr';
import '@fastify/accept-negotiator';
import 'etag';
import 'ofetch';
import 'pathe';

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
        throw createError({
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

export { unstorageToIPXStorage };
