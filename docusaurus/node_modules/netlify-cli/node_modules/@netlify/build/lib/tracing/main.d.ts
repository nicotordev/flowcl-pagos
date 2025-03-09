/** Add error information to the current active span (if any) */
export declare const addBuildErrorToActiveSpan: (error: Error) => void;
/** Attributes used for the root span of our execution */
export type RootExecutionAttributes = {
    'build.id': string;
    'site.id': string;
    'deploy.id': string;
    'deploy.context': string;
    'build.info.primary_framework': string;
};
/** Attributes used for the execution of each build step  */
export type StepExecutionAttributes = {
    'build.execution.step.name': string;
    'build.execution.step.package_name': string;
    'build.execution.step.package_path': string;
    'build.execution.step.build_dir': string;
    'build.execution.step.id': string;
    'build.execution.step.loaded_from': string;
    'build.execution.step.origin': string;
    'build.execution.step.event': string;
};
