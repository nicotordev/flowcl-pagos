'use strict';

const listhen = require('listhen');
const citty = require('citty');
const cli = require('listhen/cli');
const nodeFs = require('./shared/ipx.7601f01b.cjs');
require('defu');
require('ufo');
require('h3');
require('image-meta');
require('destr');
require('@fastify/accept-negotiator');
require('etag');
require('ofetch');
require('pathe');

const name = "ipx";
const version = "2.1.0";
const description = "High performance, secure and easy-to-use image optimizer.";

const serve = citty.defineCommand({
  meta: {
    description: "Start IPX Server"
  },
  args: {
    dir: {
      type: "string",
      required: false,
      description: "Directory to serve (default: current directory) ENV: IPX_FS_DIR"
    },
    domains: {
      type: "string",
      required: false,
      description: "Allowed domains (comma separated) ENV: IPX_HTTP_DOMAINS"
    },
    ...cli.getArgs()
  },
  async run({ args }) {
    const ipx = nodeFs.createIPX({
      storage: nodeFs.ipxFSStorage({
        dir: args.dir
      }),
      httpStorage: nodeFs.ipxHttpStorage({
        domains: args.domains
      })
    });
    await listhen.listen(nodeFs.createIPXNodeServer(ipx), {
      name: "IPX",
      ...cli.parseArgs(args)
    });
  }
});
const main = citty.defineCommand({
  meta: {
    name,
    version,
    description
  },
  subCommands: {
    serve
  }
});
citty.runMain(main);
