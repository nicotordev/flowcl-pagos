import { listen } from 'listhen';
import { defineCommand, runMain } from 'citty';
import { getArgs, parseArgs } from 'listhen/cli';
import { c as createIPX, g as ipxFSStorage, i as ipxHttpStorage, e as createIPXNodeServer } from './shared/ipx.b027cc1c.mjs';
import 'defu';
import 'ufo';
import 'h3';
import 'image-meta';
import 'destr';
import '@fastify/accept-negotiator';
import 'etag';
import 'ofetch';
import 'pathe';

const name = "ipx";
const version = "2.1.0";
const description = "High performance, secure and easy-to-use image optimizer.";

const serve = defineCommand({
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
    ...getArgs()
  },
  async run({ args }) {
    const ipx = createIPX({
      storage: ipxFSStorage({
        dir: args.dir
      }),
      httpStorage: ipxHttpStorage({
        domains: args.domains
      })
    });
    await listen(createIPXNodeServer(ipx), {
      name: "IPX",
      ...parseArgs(args)
    });
  }
});
const main = defineCommand({
  meta: {
    name,
    version,
    description
  },
  subCommands: {
    serve
  }
});
runMain(main);
