async function applyBuildSystemOverrides(settings, project, baseDirectory) {
    const buildSystem = project.buildSystems[0];
    const updatedSettings = { ...settings };
    if (baseDirectory && buildSystem) {
        const cmds = (await buildSystem.getCommands?.(baseDirectory)) || [];
        const build = cmds.find((cmd) => cmd.type === 'build');
        const dev = cmds.find((cmd) => cmd.type === 'dev');
        const dist = await buildSystem.getDist?.(baseDirectory);
        const port = await buildSystem.getPort?.(baseDirectory);
        updatedSettings.name = `${buildSystem.name} + ${settings.name} ${baseDirectory}`;
        if (build) {
            updatedSettings.buildCommand = build.command;
        }
        if (dev) {
            updatedSettings.devCommand = dev.command;
        }
        if (dist) {
            updatedSettings.dist = dist;
        }
        if (port !== undefined && port !== null) {
            updatedSettings.frameworkPort = port;
        }
        // if the build system should be run from the root then set the base directory to an empty string
        // only applicable if we have a build or dev command for it
        if (buildSystem.runFromRoot && build && dev) {
            updatedSettings.baseDirectory = '';
        }
    }
    return updatedSettings;
}
/** Retrieve the settings for a framework, used inside the CLI in conjunction with getFramework */
export async function getSettings(framework, project, baseDirectory) {
    const devCommands = framework.getDevCommands();
    const buildCommands = framework.getBuildCommands();
    const settings = {
        name: framework.name,
        buildCommand: buildCommands[0],
        devCommand: devCommands[0],
        frameworkPort: framework.dev?.port,
        dist: project.fs.join(baseDirectory, framework.build.directory),
        env: framework.env || {},
        plugins_from_config_file: [],
        plugins_recommended: framework.plugins || [],
        framework: {
            id: framework.id,
            name: framework.name,
        },
        baseDirectory,
        packagePath: baseDirectory,
        pollingStrategies: framework.dev?.pollingStrategies?.map(({ name }) => name) || [],
    };
    if (typeof framework.dev?.clearPublishDirectory !== 'undefined') {
        settings.clearPublishDirectory = framework.dev.clearPublishDirectory;
    }
    if (baseDirectory?.length && project.workspace?.isRoot) {
        settings.dist = project.fs.join(baseDirectory, framework.build.directory);
    }
    // 1. try to apply overrides for package managers (like npm, pnpm or yarn workspaces)
    // 2. try to apply build system overrides
    return applyBuildSystemOverrides(settings, 
    // await applyPackageManagerOverrides(settings, project, baseDirectory),
    project, baseDirectory);
}
/** Retrieves the build settings for a project */
export async function getBuildSettings(project, packagePath) {
    if (project.frameworks === undefined) {
        throw new Error('Please run the framework detection before calling the build settings!');
    }
    const baseDirectory = packagePath ?? project.relativeBaseDirectory ?? '';
    const settingsPromises = [];
    project.logger.debug(`[get-build-settings.ts] getBuildSettings for baseDirectory: ${baseDirectory}`);
    // if we are in a workspace and trying to retrieve the settings from the root
    if (project.workspace && project.workspace.packages.length > 0 && baseDirectory.length === 0) {
        for (const [relPkg, frameworks] of [...project.frameworks.entries()]) {
            for (const framework of frameworks) {
                settingsPromises.push(getSettings(framework, project, relPkg));
            }
        }
    }
    else {
        // we can leverage the baseDirectory as either not running from the root of a workspace or it's not a workspace
        for (const framework of project.frameworks.get(baseDirectory) || []) {
            settingsPromises.push(getSettings(framework, project, baseDirectory));
        }
    }
    const settings = await Promise.all(settingsPromises);
    return settings.filter(Boolean);
}
//# sourceMappingURL=get-build-settings.js.map