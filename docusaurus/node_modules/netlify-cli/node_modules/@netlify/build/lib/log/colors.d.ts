/**
 * Plugin child processes use `stdio: 'pipe'` so they are always
 * non-interactive even if the parent is an interactive TTY. This means they
 * would normally lose colors. If the parent has colors, we pass an environment
 * variable to the child process to force colors.
 */
export declare const getParentColorEnv: () => {
    FORCE_COLOR?: undefined;
} | {
    FORCE_COLOR: string;
};
/**
 * Child processes and the buildbot relies on `FORCE_COLOR=1` to set colors.
 * However `utils.inspect()` (used by `console.log()`) uses
 * `process.stdout.hasColors` which is always `undefined` when the TTY is
 * non-interactive. So we need to set `util.inspect.defaultOptions.colors`
 * manually both in plugin processes.
 */
export declare const setInspectColors: () => void;
