import { Context, Attributes } from '@opentelemetry/api';
/**
 * Sets attributes to be propagated across child spans under the current active context. Contexts are immutable so the
 * newly returned context must be used when instantiating a new span for these new properties to be used.
 */
export declare const setMultiSpanAttributes: (attributes: {
    [key: string]: string;
}) => Context;
/**
 * Add the provided attributes to the current active span (if any).
 */
export declare const addAttributesToActiveSpan: (attributes?: Attributes) => void;
/**
 * Add error information to the current active span (if any). Optionally sets the provided attributes on the span too.
 */
export declare const addErrorToActiveSpan: (error: Error, attributes?: Attributes) => void;
/**
 * Creates a specific event to the current active span (if any)
 */
export declare const addEventToActiveSpan: (eventName: string, attributes?: Attributes) => void;
/**
 * Sets global context to be used when initialising our root span
 */
export declare const setGlobalContext: (ctx: Context) => void;
/**
 * Gets the global context to be used when initialising our root span
 */
export declare const getGlobalContext: () => Context;
