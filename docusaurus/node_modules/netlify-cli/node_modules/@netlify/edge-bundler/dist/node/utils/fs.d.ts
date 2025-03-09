/**
 * Returns all the directories obtained by traversing `inner` and its parents
 * all the way to `outer`, inclusive.
 */
export declare const pathsBetween: (inner: string, outer: string, paths?: string[]) => string[];
