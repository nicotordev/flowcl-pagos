const noopLogger = () => {
    // no-op
};
const getLogger = (systemLogger, userLogger, debug = false) => {
    // If there is a system logger configured, we'll use that. If there isn't,
    // we'll pipe system logs to stdout if `debug` is enabled and swallow them
    // otherwise.
    const system = systemLogger !== null && systemLogger !== void 0 ? systemLogger : (debug ? console.log : noopLogger);
    const user = userLogger !== null && userLogger !== void 0 ? userLogger : console.log;
    return {
        system,
        user,
    };
};
export { getLogger };
