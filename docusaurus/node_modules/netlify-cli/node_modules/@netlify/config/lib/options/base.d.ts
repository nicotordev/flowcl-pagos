export function getBaseOverride({ repositoryRoot, cwd }: {
    repositoryRoot: any;
    cwd: any;
}): Promise<{
    base?: undefined;
    baseRelDir?: undefined;
} | {
    base: string;
    baseRelDir: boolean;
}>;
