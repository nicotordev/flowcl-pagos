import type { JSONValue } from '../utils/json_value.js';
export type StringKeys<TObject extends object> = keyof TObject & string;
export type PluginInputs<Keys extends string = string> = Partial<Record<Keys, JSONValue>>;
