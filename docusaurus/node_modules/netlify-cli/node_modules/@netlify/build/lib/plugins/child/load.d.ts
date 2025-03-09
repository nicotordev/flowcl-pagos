export declare const load: ({ pluginPath, inputs, packageJson, verbose, netlifyConfig }: {
    pluginPath: any;
    inputs: any;
    packageJson: any;
    verbose: any;
    netlifyConfig: any;
}) => Promise<{
    events: string[];
    context: {
        methods: Partial<any>;
        inputs: any;
        packageJson: any;
        verbose: any;
    };
}>;
