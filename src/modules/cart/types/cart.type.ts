import type { ProductRow } from "../../product/types/product.type.ts";

export type CartItemRow = {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    userId: string;
};

export type CartItem = {
    id: string;
    product: ProductRow;
    quantity: number;
    price: number;
    userId: string;
}