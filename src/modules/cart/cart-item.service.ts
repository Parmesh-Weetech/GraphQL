import pool from "../../config/db.ts";
import { findProductById } from "./../product/product.service.ts";
import type { CartItemRow, CartItem } from "./types/cart.item.ts";

const mapCartItem = (row: CartItemRow, product: Awaited<ReturnType<typeof findProductById>>): CartItem => {
    if (!product) {
        throw new Error(`Product with id ${row.product_id} not found`);
    }

    return {
        id: row.id,
        quantity: row.quantity,
        product: {
            id: product.id,
            name: product.name,
            price: Number(product.price)
        }
    };
};

export const findCartItemById = async (id: string) => {
    const result = await pool.query<CartItemRow>(
        "SELECT id, product_id, quantity FROM cart_items WHERE id = $1 LIMIT 1",
        [id]
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    const product = await findProductById(row.product_id);
    return product ? mapCartItem(row, product) : null;
};

export const findAllCartItems = async (): Promise<CartItem[]> => {
    const result = await pool.query<CartItemRow>("SELECT id, product_id, quantity FROM cart_items");

    const items: CartItem[] = [];

    for (const row of result.rows) {
        const product = await findProductById(row.product_id);
        if (product) {
            items.push(mapCartItem(row, product));
        }
    }

    return items;
};

export const addCartItem = async (productId: string, quantity: number) => {
    const product = await findProductById(productId);

    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    const result = await pool.query<CartItemRow>(
        "INSERT INTO cart_items (product_id, quantity) VALUES ($1, $2) RETURNING id, product_id, quantity",
        [productId, quantity]
    );

    return mapCartItem(result.rows[0], product);
};

export const clearCartItems = async () => {
    await pool.query("DELETE FROM cart_items");
};
