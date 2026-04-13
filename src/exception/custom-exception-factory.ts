import { CustomException } from './custom-exception.ts';
import { defaultErrorMessages } from './default-error-message.ts';
import type { ErrorCodes } from './error-codes.ts';

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