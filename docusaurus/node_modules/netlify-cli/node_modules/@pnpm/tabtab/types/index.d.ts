export type SupportedShell = import('./constants').SupportedShell;
export type ParseEnvResult = {
    /**
     * Whether we act in "plumbing mode" or not
     */
    complete: boolean;
    /**
     * Number of words in the completed line
     */
    words: number;
    /**
     * Cursor position
     */
    point: number;
    /**
     * Input line
     */
    line: string;
    /**
     * Part of line preceding cursor position
     */
    partial: string;
    /**
     * The last word of the line
     */
    last: string;
    /**
     * The last word of partial
     */
    lastPartial: string;
    /**
     * The word preceding last
     */
    prev: string;
};
export type CompletionItem = {
    name: string;
    description?: string | undefined;
};
import { SUPPORTED_SHELLS } from "./constants";
/**
 * This function is to be used inside a completer.
 *
 * An environment variable named `SHELL` shall be explicitly set
 * by the completion script when it invokes the completer.
 *
 * The value of `SHELL` is expected to be one of the supported shells.
 * If this expectation isn't met, it will result in an error.
 *
 * @example
 * const shell = getShellFromEnv(process.env)
 *
 * @param {Readonly.<Record.<String, String | undefined>>} env - Env objects that may contain `SHELL`, usually `process.env`.
 * @returns {SupportedShell}
 */
export function getShellFromEnv(env: Readonly<Record<string, string | undefined>>): SupportedShell;
/**
 * Check if a shell is supported.
 * @param {String} shell - Shell to check.
 * @returns {shell is SupportedShell}
 */
export function isShellSupported(shell: string): shell is "bash" | "fish" | "pwsh" | "zsh";
/**
 * Construct a completion script.
 * @param {Object} options - Options object.
 * @param {String} options.name - The package configured for completion
 * @param {String} options.completer - The program the will act as the completer for the `name` program
 * @param {SupportedShell} options.shell
 * @returns {Promise.<String>}
 */
export function getCompletionScript({ name, completer, shell }: {
    name: string;
    completer: string;
    shell: SupportedShell;
}): Promise<string>;
/**
 * Install and enable completion on user system.
 *
 * @param {Object} options
 * @param {String} options.name - Name of the program whose completion needs to be installed.
 * @param {String} options.completer - Name of the program that provides completion service.
 * @param {SupportedShell} [options.shell] - Name of the target shell. If not specified, it'll prompt the user.
 */
export function install(options: {
    name: string;
    completer: string;
    shell?: "bash" | "fish" | "pwsh" | "zsh" | undefined;
}): Promise<void>;
/**
 * Uninstall shell completion for one program from one or all supported shells.
 *
 * It also removes the relevant scripts if no more completion are installed on
 * the system.
 *
 * @param {Object} options
 * @param {String} options.name - Name of the target program.
 * @param {SupportedShell} [options.shell] - The target shell language. If not specified, target all supported shells.
 */
export function uninstall(options: {
    name: string;
    shell?: "bash" | "fish" | "pwsh" | "zsh" | undefined;
}): Promise<void>;
/**
 * @typedef {Object} ParseEnvResult
 * @property {Boolean} complete   Whether we act in "plumbing mode" or not
 * @property {Number} words       Number of words in the completed line
 * @property {Number} point       Cursor position
 * @property {String} line        Input line
 * @property {String} partial     Part of line preceding cursor position
 * @property {String} last        The last word of the line
 * @property {String} lastPartial The last word of partial
 * @property {String} prev        The word preceding last
 */
/**
 * Main utility to extract information from command line arguments and
 * Environment variables, namely COMP args in "plumbing" mode.
 *
 * @param {Record.<String, String | undefined>} env - The environment Object that holds COMP args (usually `process.env`).
 *
 * @returns {ParseEnvResult} Extracted information.
 */
export function parseEnv(env: Record<string, string | undefined>): ParseEnvResult;
/**
 * Main logging utility to pass completion items.
 *
 * This is simply an helper to log to stdout with each item separated by a new
 * line.
 *
 * Bash needs in addition to filter out the args for the completion to work
 * (zsh, fish don't need this).
 *
 * @param {Array.<CompletionItem | String>} args - to log, Strings or Objects with name and
 * description property.
 * @param {SupportedShell} shell
 * @param {(message: String) => void} logToConsole - Function to actually log to the console, usually `console.log`
 */
export function log(args: Array<CompletionItem | string>, shell: SupportedShell, logToConsole?: (message: string) => void): void;
/**
 * Logging utility to trigger the filesystem autocomplete.
 *
 * This function just returns a constant string that is then interpreted by the
 * completion scripts as an instruction to trigger the built-in filesystem
 * completion.
 */
export function logFiles(): void;
export { SUPPORTED_SHELLS };
