export function logOpts(opts: any, { logs, debug, cachedConfig, cachedConfigPath }: {
    logs: any;
    debug: any;
    cachedConfig: any;
    cachedConfigPath: any;
}): void;
export function logDefaultConfig(defaultConfig: any, { logs, debug, baseRelDir }: {
    logs: any;
    debug: any;
    baseRelDir: any;
}): void;
export function logInlineConfig(initialConfig: any, { logs, debug }: {
    logs: any;
    debug: any;
}): void;
export function logResult({ configPath, buildDir, config, context, branch, env }: {
    configPath: any;
    buildDir: any;
    config: any;
    context: any;
    branch: any;
    env: any;
}, { logs, debug }: {
    logs: any;
    debug: any;
}): void;
