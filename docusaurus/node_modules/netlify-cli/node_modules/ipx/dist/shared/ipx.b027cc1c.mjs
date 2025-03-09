import { defu } from 'defu';
import { withLeadingSlash, hasProtocol, joinURL, decode } from 'ufo';
import { createError, defineEventHandler, setResponseStatus, createApp, toWebHandler, toNodeListener, toPlainHandler, getRequestHeader, appendResponseHeader, send, getResponseHeader, setResponseHeader } from 'h3';
import { imageMeta } from 'image-meta';
import destr from 'destr';
import { negotiate } from '@fastify/accept-negotiator';
import getEtag from 'etag';
import { ofetch } from 'ofetch';
import { resolve, join, parse } from 'pathe';

const Handlers = {
  __proto__: null,
  get b () { return b; },
  get background () { return background; },
  get blur () { return blur; },
  get crop () { return crop; },
  get enlarge () { return enlarge; },
  get extend () { return extend; },
  get extract () { return extract; },
  get fit () { return fit; },
  get flatten () { return flatten; },
  get flip () { return flip; },
  get flop () { return flop; },
  get gamma () { return gamma; },
  get grayscale () { return grayscale; },
  get h () { return h; },
  get height () { return height; },
  get kernel () { return kernel; },
  get median () { return median; },
  get modulate () { return modulate; },
  get negate () { return negate; },
  get normalize () { return normalize; },
  get pos () { return pos; },
  get position () { return position; },
  get q () { return q; },
  get quality () { return quality; },
  get resize () { return resize; },
  get rotate () { return rotate; },
  get s () { return s; },
  get sharpen () { return sharpen; },
  get threshold () { return threshold; },
  get tint () { return tint; },
  get trim () { return trim; },
  get w () { return w; },
  get width () { return width; }
};

function VArg(argument) {
  return destr(argument);
}
function parseArgs(arguments_, mappers) {
  const vargs = arguments_.split("_");
  return mappers.map((v, index) => v(vargs[index]));
}
function getHandler(key) {
  return Handlers[key];
}
function applyHandler(context, pipe, handler, argumentsString) {
  const arguments_ = handler.args ? parseArgs(argumentsString, handler.args) : [];
  return handler.apply(context, pipe, ...arguments_);
}
function clampDimensionsPreservingAspectRatio(sourceDimensions, desiredDimensions) {
  const desiredAspectRatio = desiredDimensions.width / desiredDimensions.height;
  let { width, height } = desiredDimensions;
  if (sourceDimensions.width && width > sourceDimensions.width) {
    width = sourceDimensions.width;
    height = Math.round(sourceDimensions.width / desiredAspectRatio);
  }
  if (sourceDimensions.height && height > sourceDimensions.height) {
    height = sourceDimensions.height;
    width = Math.round(sourceDimensions.height * desiredAspectRatio);
  }
  return { width, height };
}

const quality = {
  args: [VArg],
  order: -1,
  apply: (context, _pipe, quality2) => {
    context.quality = quality2;
  }
};
const fit = {
  args: [VArg],
  order: -1,
  apply: (context, _pipe, fit2) => {
    context.fit = fit2;
  }
};
const position = {
  args: [VArg],
  order: -1,
  apply: (context, _pipe, position2) => {
    context.position = position2;
  }
};
const HEX_RE = /^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
const SHORTHEX_RE = /^([\da-f])([\da-f])([\da-f])$/i;
const background = {
  args: [VArg],
  order: -1,
  apply: (context, _pipe, background2) => {
    background2 = String(background2);
    if (!background2.startsWith("#") && (HEX_RE.test(background2) || SHORTHEX_RE.test(background2))) {
      background2 = "#" + background2;
    }
    context.background = background2;
  }
};
const enlarge = {
  args: [],
  apply: (context) => {
    context.enlarge = true;
  }
};
const kernel = {
  args: [VArg],
  apply: (context, _pipe, kernel2) => {
    context.kernel = kernel2;
  }
};
const width = {
  args: [VArg],
  apply: (context, pipe, width2) => {
    return pipe.resize(width2, void 0, {
      withoutEnlargement: !context.enlarge
    });
  }
};
const height = {
  args: [VArg],
  apply: (context, pipe, height2) => {
    return pipe.resize(void 0, height2, {
      withoutEnlargement: !context.enlarge
    });
  }
};
const resize = {
  args: [VArg, VArg, VArg],
  apply: (context, pipe, size) => {
    let [width2, height2] = String(size).split("x").map(Number);
    if (!width2) {
      return;
    }
    if (!height2) {
      height2 = width2;
    }
    if (!context.enlarge) {
      const clamped = clampDimensionsPreservingAspectRatio(context.meta, {
        width: width2,
        height: height2
      });
      width2 = clamped.width;
      height2 = clamped.height;
    }
    return pipe.resize(width2, height2, {
      fit: context.fit,
      position: context.position,
      background: context.background,
      kernel: context.kernel
    });
  }
};
const trim = {
  args: [VArg],
  apply: (_context, pipe, threshold2) => {
    return pipe.trim(threshold2);
  }
};
const extend = {
  args: [VArg, VArg, VArg, VArg],
  apply: (context, pipe, top, right, bottom, left) => {
    return pipe.extend({
      top,
      left,
      bottom,
      right,
      background: context.background
    });
  }
};
const extract = {
  args: [VArg, VArg, VArg, VArg],
  apply: (_context, pipe, left, top, width2, height2) => {
    return pipe.extract({
      left,
      top,
      width: width2,
      height: height2
    });
  }
};
const rotate = {
  args: [VArg],
  apply: (context, pipe, angel) => {
    return pipe.rotate(angel, {
      background: context.background
    });
  }
};
const flip = {
  args: [],
  apply: (_context, pipe) => {
    return pipe.flip();
  }
};
const flop = {
  args: [],
  apply: (_context, pipe) => {
    return pipe.flop();
  }
};
const sharpen = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe, sigma, flat, jagged) => {
    return pipe.sharpen(sigma, flat, jagged);
  }
};
const median = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe, size) => {
    return pipe.median(size);
  }
};
const blur = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe, sigma) => {
    return pipe.blur(sigma);
  }
};
const flatten = {
  args: [VArg, VArg, VArg],
  apply: (context, pipe) => {
    return pipe.flatten({
      background: context.background
    });
  }
};
const gamma = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe, gamma2, gammaOut) => {
    return pipe.gamma(gamma2, gammaOut);
  }
};
const negate = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe) => {
    return pipe.negate();
  }
};
const normalize = {
  args: [VArg, VArg, VArg],
  apply: (_context, pipe) => {
    return pipe.normalize();
  }
};
const threshold = {
  args: [VArg],
  apply: (_context, pipe, threshold2) => {
    return pipe.threshold(threshold2);
  }
};
const modulate = {
  args: [VArg],
  apply: (_context, pipe, brightness, saturation, hue) => {
    return pipe.modulate({
      brightness,
      saturation,
      hue
    });
  }
};
const tint = {
  args: [VArg],
  apply: (_context, pipe, rgb) => {
    return pipe.tint(rgb);
  }
};
const grayscale = {
  args: [VArg],
  apply: (_context, pipe) => {
    return pipe.grayscale();
  }
};
const crop = extract;
const q = quality;
const b = background;
const w = width;
const h = height;
const s = resize;
const pos = position;

function getEnv(name) {
  return name in process.env ? destr(process.env[name]) : void 0;
}
function cachedPromise(function_) {
  let p;
  return (...arguments_) => {
    if (p) {
      return p;
    }
    p = Promise.resolve(function_(...arguments_));
    return p;
  };
}

const SUPPORTED_FORMATS = /* @__PURE__ */ new Set([
  "jpeg",
  "png",
  "webp",
  "avif",
  "tiff",
  "heif",
  "gif",
  "heic"
]);
function createIPX(userOptions) {
  const options = defu(userOptions, {
    alias: getEnv("IPX_ALIAS") || {},
    maxAge: getEnv("IPX_MAX_AGE") ?? 60,
    sharpOptions: {
      jpegProgressive: true
    }
  });
  options.alias = Object.fromEntries(
    Object.entries(options.alias || {}).map((e) => [
      withLeadingSlash(e[0]),
      e[1]
    ])
  );
  const getSharp = cachedPromise(async () => {
    return await import('sharp').then(
      (r) => r.default || r
    );
  });
  const getSVGO = cachedPromise(async () => {
    const { optimize } = await import('svgo');
    return { optimize };
  });
  return function ipx(id, modifiers = {}, opts = {}) {
    if (!id) {
      throw createError({
        statusCode: 400,
        statusText: `IPX_MISSING_ID`,
        message: `Resource id is missing`
      });
    }
    id = hasProtocol(id) ? id : withLeadingSlash(id);
    for (const base in options.alias) {
      if (id.startsWith(base)) {
        id = joinURL(options.alias[base], id.slice(base.length));
      }
    }
    const storage = hasProtocol(id) ? options.httpStorage || options.storage : options.storage || options.httpStorage;
    if (!storage) {
      throw createError({
        statusCode: 500,
        statusText: `IPX_NO_STORAGE`,
        message: "No storage configured!"
      });
    }
    const getSourceMeta = cachedPromise(async () => {
      const sourceMeta = await storage.getMeta(id, opts);
      if (!sourceMeta) {
        throw createError({
          statusCode: 404,
          statusText: `IPX_RESOURCE_NOT_FOUND`,
          message: `Resource not found: ${id}`
        });
      }
      const _maxAge = sourceMeta.maxAge ?? options.maxAge;
      return {
        maxAge: typeof _maxAge === "string" ? Number.parseInt(_maxAge) : _maxAge,
        mtime: sourceMeta.mtime ? new Date(sourceMeta.mtime) : void 0
      };
    });
    const getSourceData = cachedPromise(async () => {
      const sourceData = await storage.getData(id, opts);
      if (!sourceData) {
        throw createError({
          statusCode: 404,
          statusText: `IPX_RESOURCE_NOT_FOUND`,
          message: `Resource not found: ${id}`
        });
      }
      return Buffer.from(sourceData);
    });
    const process = cachedPromise(async () => {
      const sourceData = await getSourceData();
      let imageMeta$1;
      try {
        imageMeta$1 = imageMeta(sourceData);
      } catch {
        throw createError({
          statusCode: 400,
          statusText: `IPX_INVALID_IMAGE`,
          message: `Cannot parse image metadata: ${id}`
        });
      }
      let mFormat = modifiers.f || modifiers.format;
      if (mFormat === "jpg") {
        mFormat = "jpeg";
      }
      const format = mFormat && SUPPORTED_FORMATS.has(mFormat) ? mFormat : SUPPORTED_FORMATS.has(imageMeta$1.type || "") ? imageMeta$1.type : "jpeg";
      if (imageMeta$1.type === "svg" && !mFormat) {
        if (options.svgo === false) {
          return {
            data: sourceData,
            format: "svg+xml",
            meta: imageMeta$1
          };
        } else {
          const { optimize } = await getSVGO();
          const svg = optimize(sourceData.toString("utf8"), {
            ...options.svgo,
            plugins: ["removeScriptElement", ...options.svgo?.plugins || []]
          }).data;
          return {
            data: svg,
            format: "svg+xml",
            meta: imageMeta$1
          };
        }
      }
      const animated = modifiers.animated !== void 0 || modifiers.a !== void 0 || format === "gif";
      const Sharp = await getSharp();
      let sharp = Sharp(sourceData, { animated, ...options.sharpOptions });
      Object.assign(
        sharp.options,
        options.sharpOptions
      );
      const handlers = Object.entries(modifiers).map(([name, arguments_]) => ({
        handler: getHandler(name),
        name,
        args: arguments_
      })).filter((h) => h.handler).sort((a, b) => {
        const aKey = (a.handler.order || a.name || "").toString();
        const bKey = (b.handler.order || b.name || "").toString();
        return aKey.localeCompare(bKey);
      });
      const handlerContext = { meta: imageMeta$1 };
      for (const h of handlers) {
        sharp = applyHandler(handlerContext, sharp, h.handler, h.args) || sharp;
      }
      if (SUPPORTED_FORMATS.has(format || "")) {
        sharp = sharp.toFormat(format, {
          quality: handlerContext.quality
        });
      }
      const processedImage = await sharp.toBuffer();
      return {
        data: processedImage,
        format,
        meta: imageMeta$1
      };
    });
    return {
      getSourceMeta,
      process
    };
  };
}

const MODIFIER_SEP = /[&,]/g;
const MODIFIER_VAL_SEP = /[:=_]/;
function createIPXH3Handler(ipx) {
  const _handler = async (event) => {
    const [modifiersString = "", ...idSegments] = event.path.slice(
      1
      /* leading slash */
    ).split("/");
    const id = safeString(decode(idSegments.join("/")));
    if (!modifiersString) {
      throw createError({
        statusCode: 400,
        statusText: `IPX_MISSING_MODIFIERS`,
        message: `Modifiers are missing: ${id}`
      });
    }
    if (!id || id === "/") {
      throw createError({
        statusCode: 400,
        statusText: `IPX_MISSING_ID`,
        message: `Resource id is missing: ${event.path}`
      });
    }
    const modifiers = /* @__PURE__ */ Object.create(null);
    if (modifiersString !== "_") {
      for (const p of modifiersString.split(MODIFIER_SEP)) {
        const [key, ...values] = p.split(MODIFIER_VAL_SEP);
        modifiers[safeString(key)] = values.map((v) => safeString(decode(v))).join("_");
      }
    }
    const mFormat = modifiers.f || modifiers.format;
    if (mFormat === "auto") {
      const acceptHeader = getRequestHeader(event, "accept") || "";
      const autoFormat = autoDetectFormat(
        acceptHeader,
        !!(modifiers.a || modifiers.animated)
      );
      delete modifiers.f;
      delete modifiers.format;
      if (autoFormat) {
        modifiers.format = autoFormat;
        appendResponseHeader(event, "vary", "Accept");
      }
    }
    const img = ipx(id, modifiers);
    const sourceMeta = await img.getSourceMeta();
    sendResponseHeaderIfNotSet(
      event,
      "content-security-policy",
      "default-src 'none'"
    );
    if (sourceMeta.mtime) {
      sendResponseHeaderIfNotSet(
        event,
        "last-modified",
        sourceMeta.mtime.toUTCString()
      );
      const _ifModifiedSince = getRequestHeader(event, "if-modified-since");
      if (_ifModifiedSince && new Date(_ifModifiedSince) >= sourceMeta.mtime) {
        setResponseStatus(event, 304);
        return send(event);
      }
    }
    const { data, format } = await img.process();
    if (typeof sourceMeta.maxAge === "number") {
      sendResponseHeaderIfNotSet(
        event,
        "cache-control",
        `max-age=${+sourceMeta.maxAge}, public, s-maxage=${+sourceMeta.maxAge}`
      );
    }
    const etag = getEtag(data);
    sendResponseHeaderIfNotSet(event, "etag", etag);
    if (etag && getRequestHeader(event, "if-none-match") === etag) {
      setResponseStatus(event, 304);
      return send(event);
    }
    if (format) {
      sendResponseHeaderIfNotSet(event, "content-type", `image/${format}`);
    }
    return data;
  };
  return defineEventHandler(async (event) => {
    try {
      return await _handler(event);
    } catch (_error) {
      const error = createError(_error);
      setResponseStatus(event, error.statusCode, error.statusMessage);
      return {
        error: {
          message: `[${error.statusCode}] [${error.statusMessage || "IPX_ERROR"}] ${error.message}`
        }
      };
    }
  });
}
function createIPXH3App(ipx) {
  const app = createApp({ debug: true });
  app.use(createIPXH3Handler(ipx));
  return app;
}
function createIPXWebServer(ipx) {
  return toWebHandler(createIPXH3App(ipx));
}
function createIPXNodeServer(ipx) {
  return toNodeListener(createIPXH3App(ipx));
}
function createIPXPlainServer(ipx) {
  return toPlainHandler(createIPXH3App(ipx));
}
function sendResponseHeaderIfNotSet(event, name, value) {
  if (!getResponseHeader(event, name)) {
    setResponseHeader(event, name, value);
  }
}
function autoDetectFormat(acceptHeader, animated) {
  if (animated) {
    const acceptMime2 = negotiate(acceptHeader, ["image/webp", "image/gif"]);
    return acceptMime2?.split("/")[1] || "gif";
  }
  const acceptMime = negotiate(acceptHeader, [
    "image/avif",
    "image/webp",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/heif",
    "image/gif"
  ]);
  return acceptMime?.split("/")[1] || "jpeg";
}
function safeString(input) {
  return JSON.stringify(input).replace(/^"|"$/g, "").replace(/\\+/g, "\\").replace(/\\"/g, '"');
}

const HTTP_RE = /^https?:\/\//;
function ipxHttpStorage(_options = {}) {
  const allowAllDomains = _options.allowAllDomains ?? getEnv("IPX_HTTP_ALLOW_ALL_DOMAINS") ?? false;
  let _domains = _options.domains || getEnv("IPX_HTTP_DOMAINS") || [];
  const defaultMaxAge = _options.maxAge || getEnv("IPX_HTTP_MAX_AGE") || 300;
  const fetchOptions = _options.fetchOptions || getEnv("IPX_HTTP_FETCH_OPTIONS") || {};
  if (typeof _domains === "string") {
    _domains = _domains.split(",").map((s) => s.trim());
  }
  const domains = new Set(
    _domains.map((d) => {
      if (!HTTP_RE.test(d)) {
        d = "http://" + d;
      }
      return new URL(d).hostname;
    }).filter(Boolean)
  );
  function validateId(id) {
    const url = new URL(decodeURIComponent(id));
    if (!url.hostname) {
      throw createError({
        statusCode: 403,
        statusText: `IPX_MISSING_HOSTNAME`,
        message: `Hostname is missing: ${id}`
      });
    }
    if (!allowAllDomains && !domains.has(url.hostname)) {
      throw createError({
        statusCode: 403,
        statusText: `IPX_FORBIDDEN_HOST`,
        message: `Forbidden host: ${url.hostname}`
      });
    }
    return url.toString();
  }
  function parseResponse(response) {
    let maxAge = defaultMaxAge;
    if (_options.ignoreCacheControl) {
      const _cacheControl = response.headers.get("cache-control");
      if (_cacheControl) {
        const m = _cacheControl.match(/max-age=(\d+)/);
        if (m && m[1]) {
          maxAge = Number.parseInt(m[1]);
        }
      }
    }
    let mtime;
    const _lastModified = response.headers.get("last-modified");
    if (_lastModified) {
      mtime = new Date(_lastModified);
    }
    return { maxAge, mtime };
  }
  return {
    name: "ipx:http",
    async getMeta(id) {
      const url = validateId(id);
      try {
        const response = await ofetch.raw(url, {
          ...fetchOptions,
          method: "HEAD"
        });
        const { maxAge, mtime } = parseResponse(response);
        return { mtime, maxAge };
      } catch {
        return {};
      }
    },
    async getData(id) {
      const url = validateId(id);
      const response = await ofetch(url, {
        ...fetchOptions,
        method: "GET",
        responseType: "arrayBuffer"
      });
      return response;
    }
  };
}

function ipxFSStorage(_options = {}) {
  const dirs = resolveDirs(_options.dir);
  const maxAge = _options.maxAge || getEnv("IPX_FS_MAX_AGE");
  const _getFS = cachedPromise(
    () => import('node:fs/promises').catch(() => {
      throw createError({
        statusCode: 500,
        statusText: `IPX_FILESYSTEM_ERROR`,
        message: `Failed to resolve filesystem module`
      });
    })
  );
  const resolveFile = async (id) => {
    const fs = await _getFS();
    for (const dir of dirs) {
      const filePath = join(dir, id);
      if (!isValidPath(filePath) || !filePath.startsWith(dir)) {
        throw createError({
          statusCode: 403,
          statusText: `IPX_FORBIDDEN_PATH`,
          message: `Forbidden path: ${id}`
        });
      }
      try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
          continue;
        }
        return {
          stats,
          read: () => fs.readFile(filePath)
        };
      } catch (error) {
        if (error.code === "ENOENT") {
          continue;
        }
        throw createError({
          statusCode: 403,
          statusText: `IPX_FORBIDDEN_FILE`,
          message: `Cannot access file: ${id}`
        });
      }
    }
    throw createError({
      statusCode: 404,
      statusText: `IPX_FILE_NOT_FOUND`,
      message: `File not found: ${id}`
    });
  };
  return {
    name: "ipx:node-fs",
    async getMeta(id) {
      const { stats } = await resolveFile(id);
      return {
        mtime: stats.mtime,
        maxAge
      };
    },
    async getData(id) {
      const { read } = await resolveFile(id);
      return read();
    }
  };
}
const isWindows = process.platform === "win32";
function isValidPath(fp) {
  if (isWindows) {
    fp = fp.slice(parse(fp).root.length);
  }
  if (/["*:<>?|]/.test(fp)) {
    return false;
  }
  return true;
}
function resolveDirs(dirs) {
  if (!dirs || !Array.isArray(dirs)) {
    const dir = resolve(dirs || getEnv("IPX_FS_DIR") || ".");
    return [dir];
  }
  return dirs.map((dirs2) => resolve(dirs2));
}

export { createIPXH3Handler as a, createIPXH3App as b, createIPX as c, createIPXWebServer as d, createIPXNodeServer as e, createIPXPlainServer as f, ipxFSStorage as g, ipxHttpStorage as i };
