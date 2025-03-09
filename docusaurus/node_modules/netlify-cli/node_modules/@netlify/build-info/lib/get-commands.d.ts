/** A list of often used dev command names to identify if the command is a dev command */
export declare const NPM_DEV_SCRIPTS: string[];
/** A list of often used build command names to identify if the command is a build command */
export declare const NPM_BUILD_SCRIPTS: string[];
/** Check if the npm script is likely to contain a dev command */
export declare const isNpmDevScript: (scriptName: string, scriptValue: string) => boolean;
/** Check if the npm script is likely to contain a build command */
export declare const isNpmBuildScript: (scriptName: string, scriptValue: string) => boolean;
/** Retrieve a list of NPM dev scripts */
export declare function getDevCommands(frameworkDevCommand: string, scripts?: Record<string, string>): string[];
/** Retrieve a list of NPM build scripts */
export declare function getBuildCommands(frameworkBuildCommand: string, scripts?: Record<string, string>): string[];
