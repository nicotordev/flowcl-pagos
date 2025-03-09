var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["LOG"] = "log";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel || (LogLevel = {}));
export class DefaultLogger {
    logLevel;
    constructor(logLevel = LogLevel.ERROR) {
        this.logLevel = logLevel;
    }
    shouldLog(logLevel) {
        const logLevelOrder = ['debug', 'log', 'info', 'warn', 'error'];
        return logLevelOrder.indexOf(logLevel) >= logLevelOrder.indexOf(this.logLevel);
    }
    debug(...args) {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.debug(...args);
        }
    }
    log(...args) {
        if (this.shouldLog(LogLevel.LOG)) {
            console.log(...args);
        }
    }
    info(...args) {
        if (this.shouldLog(LogLevel.INFO)) {
            console.info(...args);
        }
    }
    warn(...args) {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(...args);
        }
    }
    error(...args) {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(...args);
        }
    }
}
//# sourceMappingURL=logger.js.map