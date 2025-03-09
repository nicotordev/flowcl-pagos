import net from 'net';
/**
 * Creates the Buildbot IPC client we use to initiate the deploy
 */
export declare const createBuildbotClient: (buildbotServerSocket: string) => net.Socket;
/**
 * Emits the connect event
 */
export declare const connectBuildbotClient: (...args: unknown[]) => Promise<void>;
/**
 * Closes the buildbot client and its connection
 */
export declare const closeBuildbotClient: (client: net.Socket) => Promise<void>;
/**
 * Initates the deploy with the given buildbot client
 */
export declare const deploySiteWithBuildbotClient: ({ client, events, buildDir, repositoryRoot, constants }: {
    client: any;
    events: any;
    buildDir: any;
    repositoryRoot: any;
    constants: any;
}) => Promise<undefined>;
