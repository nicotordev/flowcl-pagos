import { addErrorToActiveSpan } from '@netlify/opentelemetry-utils';
import { isBuildError } from '../error/info.js';
import { parseErrorInfo } from '../error/parse/parse.js';
import { buildErrorToTracingAttributes } from '../error/types.js';
/** Add error information to the current active span (if any) */
export const addBuildErrorToActiveSpan = function (error) {
    let buildErrorAttributes;
    if (isBuildError(error)) {
        const buildError = parseErrorInfo(error);
        if (buildError.severity == 'none')
            return;
        buildErrorAttributes = buildErrorToTracingAttributes(buildError);
    }
    addErrorToActiveSpan(error, buildErrorAttributes);
};
