import { ErrorCodes } from './error-codes';
import type { ErrorPayload } from './type';

export const defaultErrorMessages: Record<
    ErrorCodes,
    Pick<ErrorPayload, 'message' | 'statusCode'>
> = {
    [ErrorCodes.BAD_REQUEST]: {
        message: 'Bad request',
        statusCode: 400,
    },
    [ErrorCodes.VALIDATION_ERROR]: {
        message: 'Validation failed',
        statusCode: 400,
    },
    [ErrorCodes.UNAUTHORIZED]: {
        message: 'Unauthorized',
        statusCode: 401,
    },
    [ErrorCodes.FORBIDDEN]: {
        message: 'Forbidden',
        statusCode: 403,
    },
    [ErrorCodes.INTERNAL_SERVER_ERROR]: {
        message: 'Internal server error',
        statusCode: 500,
    },
    [ErrorCodes.NOT_FOUND]: {
        message: 'Not found',
        statusCode: 404,
    },
    [ErrorCodes.TOO_MANY_REQUESTS]: {
        message: 'Too many requests, please try again later.',
        statusCode: 429,
    },

    [ErrorCodes.USER_EXISTS]: {
        message: 'User already exists',
        statusCode: 409,
    },
    [ErrorCodes.USER_NOT_FOUND]: {
        message: 'User not found',
        statusCode: 404,
    },
    [ErrorCodes.INVALID_CREDENTIALS]: {
        message: 'Invalid credentials',
        statusCode: 401,
    },
    [ErrorCodes.INVALID_ACCESS_TOKEN]: {
        message: 'Invalid access token',
        statusCode: 401,
    },
    [ErrorCodes.INVALID_REFRESH_TOKEN]: {
        message: 'Invalid refresh token',
        statusCode: 401,
    },

    [ErrorCodes.PRODUCT_NOT_FOUND]: {
        message: 'Product not found',
        statusCode: 404,
    },
    [ErrorCodes.PRODUCT_OUT_OF_STOCK]: {
        message: 'Product is out of stock',
        statusCode: 400,
    },
    [ErrorCodes.INVALID_PRODUCT_PRICE]: {
        message: 'Invalid product price',
        statusCode: 400,
    },

    [ErrorCodes.CART_EMPTY]: {
        message: 'Cart is empty',
        statusCode: 400,
    },
    [ErrorCodes.CART_ITEM_NOT_FOUND]: {
        message: 'Cart item not found',
        statusCode: 404,
    },
    [ErrorCodes.CART_ITEM_ALREADY_EXISTS]: {
        message: 'Product already in cart',
        statusCode: 409,
    },
    [ErrorCodes.INVALID_QUANTITY]: {
        message: 'Invalid quantity',
        statusCode: 400,
    },

    [ErrorCodes.ORDER_NOT_FOUND]: {
        message: 'Order not found',
        statusCode: 404,
    },
    [ErrorCodes.ORDER_ALREADY_PLACED]: {
        message: 'Order already placed',
        statusCode: 409,
    },
    [ErrorCodes.ORDER_CANCEL_NOT_ALLOWED]: {
        message: 'Order cannot be cancelled',
        statusCode: 403,
    },
    [ErrorCodes.ORDER_ITEMS_EMPTY]: {
        message: 'Order has no items',
        statusCode: 400,
    },
    [ErrorCodes.INSUFFICIENT_STOCK]: {
        message: 'Insufficient stock',
        statusCode: 400,
    },
    [ErrorCodes.ORDER_STATUS_INVALID]: {
        message: 'Invalid order status',
        statusCode: 400,
    },
};