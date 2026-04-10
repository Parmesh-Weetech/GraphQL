import type { ProductRow } from "../../product/types/product.type.ts"

export type Order = {
    id: string
    total: number
    userId: string
    status: string
    items: OrderItemRow[]
}

export type OrderItemRow = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    totalPrice: number;
};

export type OrderItem = {
    id: string;
    orderId: string;
    product: ProductRow;
    quantity: number;
    price: number;
    totalPrice: number;
}