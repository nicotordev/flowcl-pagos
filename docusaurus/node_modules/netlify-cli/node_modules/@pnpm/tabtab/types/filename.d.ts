/**
 * Get a template file name for the SHELL provided.
 * @param {import('./constants').SupportedShell} shell
 * @returns {String}
 */
export function templateFileName(shell: import('./constants').SupportedShell): string;
/**
 * Get a extension for the completion file of the SHELL (without the leading period).
 * @param {String} name
 * @param {import('./constants').SupportedShell} shell
 * @returns {String}
 */
export function completionFileName(name: string, shell: import('./constants').SupportedShell): string;
/**
 * Get a tabtab file name for the SHELL provided.
 * @param {import('./constants').SupportedShell} shell
 * @returns {String}
 */
export function tabtabFileName(shell: import('./constants').SupportedShell): string;
