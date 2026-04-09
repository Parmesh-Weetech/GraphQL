import type { ProductRow } from "../../product/types/product.type.ts";

export type CartItemRow = {
    id: string;
    product_id: string;
    quantity: number;
};

export type CartItem = {
    id: string;
    product: ProductRow;
    quantity: number;
};