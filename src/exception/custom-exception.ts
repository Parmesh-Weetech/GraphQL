import type { ErrorCodes } from './error-codes.ts';

export class CustomException extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCodes;

    constructor(message: string, statusCode: number, code: ErrorCodes) {
        super(message);
        this.name = 'CustomException';
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}