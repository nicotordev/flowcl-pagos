export = prompt;
/**
 * @typedef {import('./constants').SupportedShell} SupportedShell
 */
/**
 * @typedef {Object} PromptAnswer
 * @property {SupportedShell} shell
 * @property {String} location
 */
/**
 * Asks user about SHELL and desired location.
 *
 * It is too difficult to check spawned SHELL, the user has to use chsh before
 * it is reflected in process.env.SHELL
 *
 * @returns {Promise.<PromptAnswer>}
 */
declare function prompt(): Promise<PromptAnswer>;
declare namespace prompt {
    export { SupportedShell, PromptAnswer };
}
type PromptAnswer = {
    shell: SupportedShell;
    location: string;
};
type SupportedShell = import('./constants').SupportedShell;
