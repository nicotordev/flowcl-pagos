import { Transform } from 'stream';
import type { StandardStreams } from './stream.js';
declare const flusherSymbol: unique symbol;
/**
 * Utility class for conditionally rendering certain output only if additional
 * data flows through. The constructor takes a "buffer" function that renders
 * the optional data. When flushed, that function is called.
 */
export declare class OutputFlusher {
    private buffer;
    flushed: boolean;
    constructor(bufferFn: () => void);
    flush(): void;
}
/**
 * A `Transform` stream that takes an `OutputFlusher` instance and flushes it
 * whenever data flows through, before piping the data to its destination.
 */
export declare class OutputFlusherTransform extends Transform {
    [flusherSymbol]: OutputFlusher;
    constructor(flusher: OutputFlusher);
    _transform(chunk: any, _: string, callback: () => void): void;
}
export declare const getStandardStreams: (outputFlusher?: OutputFlusher) => StandardStreams;
export {};
