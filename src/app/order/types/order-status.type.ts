import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
    PENDING = 'PENDING',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    ORDERED = 'ORDERED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    FAIL = 'FAIL',
    CANCALLED = 'CANCALLED'
}

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
});
