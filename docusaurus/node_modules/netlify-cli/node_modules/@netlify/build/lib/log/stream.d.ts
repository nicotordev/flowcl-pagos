import type { ChildProcess } from '../plugins/spawn.js';
import { Logs } from './logger.js';
import type { OutputFlusher } from './output_flusher.js';
export type StandardStreams = {
    stderr: NodeJS.WriteStream;
    stdout: NodeJS.WriteStream;
    outputFlusher?: OutputFlusher;
};
type LogsListener = (logs: string[], outputFlusher: OutputFlusher | undefined, chunk: Buffer) => void;
type LogsListeners = {
    stderrListener: LogsListener;
    stdoutListener: LogsListener;
};
export declare const getBuildCommandStdio: (logs: Logs) => "pipe" | "inherit";
export declare const handleBuildCommandOutput: ({ stdout: commandStdout, stderr: commandStderr }: {
    stdout: string;
    stderr: string;
}, logs: Logs) => void;
export declare const pipePluginOutput: (childProcess: ChildProcess, logs: Logs, standardStreams: StandardStreams) => void | LogsListeners;
export declare const unpipePluginOutput: (childProcess: ChildProcess, logs: Logs, listeners: LogsListeners, standardStreams: StandardStreams) => Promise<void>;
export {};
