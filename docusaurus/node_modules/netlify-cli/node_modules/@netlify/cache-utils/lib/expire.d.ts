/**
 * Calculate the expiration date based on a time to leave in seconds
 * This might be used to retrieve the expiration date when caching a file
 */
export declare const getExpires: (timeToLeave: number) => number | undefined;
/**
 * Check if a expiredDate in milliseconds (retrieved by `Date.now`) has already expired
 * This might be used to check if a file is expired
 */
export declare const checkExpires: (expiredDate: number) => boolean;
