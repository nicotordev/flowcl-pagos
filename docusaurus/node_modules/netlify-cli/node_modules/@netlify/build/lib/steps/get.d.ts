import { CoreStep } from '../plugins_core/types.js';
export declare const getSteps: (steps: any, eventHandlers?: any[]) => {
    steps: CoreStep[];
    events: unknown[];
};
export declare const getDevSteps: (command: any, steps: any, eventHandlers?: any[]) => {
    steps: CoreStep[];
    events: unknown[];
};
