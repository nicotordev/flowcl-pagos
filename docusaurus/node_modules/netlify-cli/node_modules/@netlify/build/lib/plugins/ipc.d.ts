export function callChild({ childProcess, eventName, payload, logs, verbose }: {
    childProcess: any;
    eventName: any;
    payload: any;
    logs: any;
    verbose: any;
}): Promise<any>;
export function getEventFromChild(childProcess: any, callId: any): Promise<any>;
export function getEventsFromParent(callback: any): Promise<any>;
export function sendEventToParent(callId: any, payload: any, verbose: any, error: any): Promise<void>;
