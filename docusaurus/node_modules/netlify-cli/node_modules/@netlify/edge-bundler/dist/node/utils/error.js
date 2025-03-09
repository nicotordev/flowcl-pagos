export const isNodeError = (error) => error instanceof Error;
export const isFileNotFoundError = (error) => isNodeError(error) && error.code === 'ENOENT';
