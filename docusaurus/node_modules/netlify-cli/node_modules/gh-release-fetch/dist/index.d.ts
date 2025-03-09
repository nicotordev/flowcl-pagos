/// <reference types="node" resolution-mode="require"/>
import { Agent } from 'https';
import { RequestInit } from 'node-fetch';
interface DownloadOptions {
    agent?: Agent;
}
interface FetchOptions extends Omit<RequestInit, 'agent'>, DownloadOptions {
}
export interface Release {
    repository: string;
    package: string;
    destination: string;
    version: string;
    extract: boolean;
}
export declare function fetchLatest(release: Release, fetchOptions?: FetchOptions): Promise<void>;
export declare function fetchVersion(release: Release, { agent }?: DownloadOptions): Promise<void>;
export declare function updateAvailable(repository: string, currentVersion: string, fetchOptions?: RequestInit): Promise<boolean>;
export declare function newerVersion(latestVersion: string, currentVersion: string): boolean;
export {};
