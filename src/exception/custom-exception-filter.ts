import type { Request, Response } from 'express';
import { CustomException } from './custom-exception.ts';
import { ErrorCodes } from './error-codes.ts';

interface ValidationError {
    field: string;
    message: string;
}

export const customExceptionFilter = (err: Error, req: Request, res: Response, _next: () => void) => {
    if (err instanceof CustomException) {
        const status = err.statusCode;
        
        const baseResponse: Record<string, unknown> = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: req.url,
            message: err.message,
            errorCode: err.code,
        };

        if (err.code === ErrorCodes.VALIDATION_ERROR) {
            const validationErrors = (err as unknown as { validationErrors?: ValidationError[] }).validationErrors;
            if (validationErrors && validationErrors.length > 0) {
                baseResponse['errors'] = validationErrors;
            }
        }

        return res.status(status).json(baseResponse);
    }

    const status = 500;
    return res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: 'Internal server error',
        errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
};