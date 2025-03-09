import { type Client, NotifiableError } from '@bugsnag/js';
export type Severity = 'info' | 'warning' | 'error';
/** Report an error to bugsnag */
export declare function report(error: NotifiableError | Record<string, any>, options?: {
    context?: string;
    severity?: Severity;
    metadata?: Record<string, Record<string, any>>;
    client?: Client;
}): void;
