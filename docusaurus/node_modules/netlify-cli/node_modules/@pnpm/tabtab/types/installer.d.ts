export type SupportedShell = import('./constants').SupportedShell;
/**
 * Top level install method. Does three things:
 *
 * - Writes to SHELL config file, adding a new line to tabtab internal script.
 * - Creates or edit tabtab internal script
 * - Creates the actual completion script for this package.
 *
 * @param {Object} options - Options object with
 * @param {String} options.name - The program name to complete
 * @param {String} options.completer - The actual program or binary that will act as the completer
 *    for `name` program. Can be the same.
 * @param {String} options.location - The SHELL script config location (~/.bashrc, ~/.zshrc or
 *    ~/.config/fish/config.fish)
 * @param {SupportedShell} options.shell - the target shell language
 */
export function install(options: {
    name: string;
    completer: string;
    location: string;
    shell: SupportedShell;
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
 * Checks a given file for the existence of a specific line. Used to prevent
 * adding multiple completion source to SHELL scripts.
 *
 * @param {String} filename - The filename to check against
 * @param {String} line     - The line to look for
 * @returns {Promise.<Boolean>} true or false, false if the line is not present.
 */
export function checkFilenameForLine(filename: string, line: string): Promise<boolean>;
/**
 * Construct a completion script
 * @param {Object} options - Options object
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
 * Writes to SHELL config file adding a new line, but only one, to the SHELL
 * config script. This enables tabtab to work for the given SHELL.
 *
 * @param {Object} options - Options object with
 * @param {String} options.location - The SHELL script location (~/.bashrc, ~/.zshrc or
 *    ~/.config/fish/config.fish)
 * @param {String} options.name - The package configured for completion
 * @param {SupportedShell} options.shell options.shell
 */
export function writeToShellConfig({ location, name, shell }: {
    location: string;
    name: string;
    shell: SupportedShell;
}): Promise<void>;
/**
 * Writes to tabtab internal script that acts as a frontend router for the
 * completion mechanism, in the internal ~/.config/tabtab directory. Every
 * completion is added to this file.
 *
 * @param {Object} options - Options object with
 * @param {String} options.name - The package configured for completion
 * @param {SupportedShell} options.shell
 */
export function writeToTabtabScript({ name, shell }: {
    name: string;
    shell: SupportedShell;
}): Promise<void>;
/**
 * This writes a new completion script in the internal `~/.config/tabtab`
 * directory. Depending on the SHELL used, a different script is created for
 * the given SHELL.
 *
 * @param {Object} options - Options object with
 * @param {String} options.name - The package configured for completion
 * @param {String} options.completer - The binary that will act as the completer for `name` program
 * @param {SupportedShell} options.shell
 */
export function writeToCompletionScript({ name, completer, shell }: {
    name: string;
    completer: string;
    shell: SupportedShell;
}): Promise<void>;
/**
 * Opens a file for modification adding a new `source` line for the given
 * SHELL. Used for both SHELL script and tabtab internal one.
 *
 * @param {Object} options - Options.
 * @param {String} options.filename - The file to modify.
 * @param {String} options.scriptname - The line to add sourcing this file.
 * @param {String} options.name - The package being configured.
 * @param {SupportedShell} options.shell
 * @returns {Promise.<void>}
 */
export function writeLineToFilename({ filename, scriptname, name, shell }: {
    filename: string;
    scriptname: string;
    name: string;
    shell: SupportedShell;
}): Promise<void>;
