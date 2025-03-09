export function installDependencies({ packageRoot, isLocal }: {
    packageRoot: any;
    isLocal: any;
}): Promise<void>;
export function addExactDependencies({ packageRoot, isLocal, packages }: {
    packageRoot: any;
    isLocal: any;
    packages: any;
}): Promise<void> | undefined;
