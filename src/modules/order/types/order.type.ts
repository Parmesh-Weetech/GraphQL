import type { CartItem } from "../../cart/types/cart.item.ts";

export type OrderRow = {
    id: string
    total: number
}

export type OrderItemRow = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
};

export type OrderItem = {
    id: string;
    cart: CartItem;
    order: OrderRow;
};