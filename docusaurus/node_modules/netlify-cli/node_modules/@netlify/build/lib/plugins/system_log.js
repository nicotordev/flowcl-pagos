export const captureStandardError = (childProcess, systemLog, eventName, featureFlags) => {
    if (!featureFlags.netlify_build_plugin_system_log) {
        return () => {
            // no-op
        };
    }
    let buffer = '';
    const listener = (chunk) => {
        buffer += chunk.toString();
    };
    childProcess.stderr?.on('data', listener);
    const cleanup = () => {
        childProcess.stderr?.removeListener('data', listener);
        if (buffer.length !== 0) {
            systemLog(`Plugin failed to initialize during the "${eventName}" phase: ${buffer.trim()}`);
        }
    };
    return cleanup;
};
