export const ErrorCodes = {
    BAD_REQUEST: 'common.bad-request',
    VALIDATION_ERROR: 'common.validation-error',
    UNAUTHORIZED: 'auth.unauthorized',
    FORBIDDEN: 'common.forbidden',
    INTERNAL_SERVER_ERROR: 'common.internal-server-error',
    NOT_FOUND: 'common.not-found',
    TOO_MANY_REQUESTS: 'common.too-many-requests',

    USER_EXISTS: 'user.exists',
    USER_NOT_FOUND: 'user.not-found',
    INVALID_CREDENTIALS: 'auth.invalid-credentials',
    INVALID_ACCESS_TOKEN: 'auth.invalid-access-token',
    INVALID_REFRESH_TOKEN: 'auth.invalid-refresh-token',

    PRODUCT_NOT_FOUND: 'product.not-found',
    PRODUCT_OUT_OF_STOCK: 'product.out-of-stock',
    INVALID_PRODUCT_PRICE: 'product.invalid-price',

    CART_EMPTY: 'cart.empty',
    CART_ITEM_NOT_FOUND: 'cart.item-not-found',
    CART_ITEM_ALREADY_EXISTS: 'cart.item-already-exists',
    INVALID_QUANTITY: 'cart.invalid-quantity',

    ORDER_NOT_FOUND: 'order.not-found',
    ORDER_ALREADY_PLACED: 'order.already-placed',
    ORDER_CANCEL_NOT_ALLOWED: 'order.cancel-not-allowed',
    ORDER_ITEMS_EMPTY: 'order.items-empty',
    INSUFFICIENT_STOCK: 'order.insufficient-stock',
    ORDER_STATUS_INVALID: 'order.status-invalid',
} as const;

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes];