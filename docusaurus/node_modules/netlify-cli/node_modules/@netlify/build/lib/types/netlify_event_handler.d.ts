import type { PluginInputs, StringKeys } from './config/inputs.js';
import type { NetlifyPluginOptions } from './netlify_plugin_options.js';
interface NetlifyEventHandler<PluginOptions extends NetlifyPluginOptions = NetlifyPluginOptions> {
    (options: PluginOptions): void | Promise<void>;
}
export type OnPreBuild<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs>>;
export type OnBuild<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs>>;
export type OnPostBuild<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs>>;
export type OnError<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs> & {
    error: Error;
}>;
export type OnSuccess<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs>>;
export type OnEnd<TInputs extends PluginInputs<StringKeys<TInputs>> = PluginInputs> = NetlifyEventHandler<NetlifyPluginOptions<TInputs> & {
    error?: Error;
}>;
export {};
