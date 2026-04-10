import pool from "../../config/db.ts";
import { findProductById } from "../product/product.service.ts";
import type { ProductRow } from "../product/types/product.type.ts";
import type { CartItem, CartItemRow } from "./types/cart.type.ts";

const mapCartItem = (row: CartItemRow, product: ProductRow): CartItem => {
    if (!product) {
        throw new Error(`Product with id ${row.productId} not found`);
    }

    return {
        id: row.id,
        quantity: row.quantity,
        product: {
            id: product.id,
            name: product.name,
            price: Number(product.price),
        },
        price: row.price,
        userId: row.userId
    }
};

export const findCartItemById = async (id: string) => {
    const result = await pool.query<CartItemRow>(
        "SELECT id, productId, price, quantity, userId, totalPrice FROM cart_items WHERE id = $1 LIMIT 1",
        [id]
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    const product = await findProductById(row.productId);
    return product ? mapCartItem(row, product) : null;
};

export const findAllCartItems = async (userId: string): Promise<CartItem[]> => {
    const result = await pool.query<CartItemRow>("SELECT id, productId, quantity, price, userId, totalPrice FROM cart_items WHERE userId = $1", [userId]);

    const items: CartItem[] = [];

    for (const row of result.rows) {
        const product = await findProductById(row.productId);
        if (product) {
            items.push(mapCartItem(row, product));
        }
    }

    return items;
};

export const addCartItem = async (productId: string, quantity: number, userId: string) => {
    const product = await findProductById(productId);

    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    const result = await pool.query<CartItemRow>(
        "INSERT INTO cart_items (productId, quantity, price, userId, totalPrice) VALUES ($1, $2, $3, $4, $5) RETURNING id, productId, quantity, price, userId",
        [productId, quantity, product.price, userId, product.price * quantity]
    );

    return mapCartItem(result.rows[0], product);
};

export const removeCartItem = async (id: string) => {
    await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);
}

export const clearCartItems = async (userId: string) => {
    await pool.query("DELETE FROM cart_items WHERE userId = $1", [userId]);
};
