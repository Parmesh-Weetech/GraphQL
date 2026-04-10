import { CustomException } from './custom-exception.js';
import { defaultErrorMessages } from './default-error-message.js';
import type { ErrorCodes } from './error-codes.js';

export class CustomExceptionFactory {
    public static create(
        code: ErrorCodes,
        message?: string,
        statusCode?: number,
    ): CustomException {
        return new CustomException(
            message ?? defaultErrorMessages[code].message,
            statusCode ?? defaultErrorMessages[code].statusCode,
            code,
        );
    }
}