import { stdout, stderr } from 'process';
import { Transform } from 'stream';
const flusherSymbol = Symbol.for('@netlify/output-gate');
/**
 * Utility class for conditionally rendering certain output only if additional
 * data flows through. The constructor takes a "buffer" function that renders
 * the optional data. When flushed, that function is called.
 */
export class OutputFlusher {
    buffer;
    flushed;
    constructor(bufferFn) {
        this.flushed = false;
        this.buffer = bufferFn;
    }
    flush() {
        if (!this.flushed) {
            this.buffer();
            this.flushed = true;
        }
    }
}
/**
 * A `Transform` stream that takes an `OutputFlusher` instance and flushes it
 * whenever data flows through, before piping the data to its destination.
 */
export class OutputFlusherTransform extends Transform {
    [flusherSymbol];
    constructor(flusher) {
        super();
        this[flusherSymbol] = flusher;
    }
    _transform(chunk, _, callback) {
        this[flusherSymbol].flush();
        this.push(chunk);
        callback();
    }
}
export const getStandardStreams = (outputFlusher) => {
    if (!outputFlusher) {
        return {
            stdout,
            stderr,
        };
    }
    return {
        outputFlusher,
        stdout: new OutputFlusherTransform(outputFlusher).pipe(stdout),
        stderr: new OutputFlusherTransform(outputFlusher).pipe(stderr),
    };
};
