import pool from "../../config/db.ts";
import type { ProductRow } from "./types/product.type.ts";

export const findProductById: (id: string) => Promise<ProductRow | null> = async (id: string) => {
    const result = await pool.query<ProductRow>(
        "SELECT id, name, price FROM products WHERE id = $1 LIMIT 1",
        [id]
    );

    const product = result.rows[0];

    if (!product) {
        return null;
    }

    return {
        id: product.id,
        name: product.name,
        price: Number(product.price)
    };
};

export const findAllProducts: () => Promise<ProductRow[]> = async () => {
    const result = await pool.query<ProductRow>(
        "SELECT id, name, price FROM products"
    );

    return result.rows.map(product => ({
        id: product.id,
        name: product.name,
        price: Number(product.price)
    }));
};

export const addProduct = async (name: string, price: number) => {
    const result = await pool.query<ProductRow>(
        "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price",
        [name, price]
    );

    const product = result.rows[0];

    return {
        id: product.id,
        name: product.name,
        price: Number(product.price)
    };
};
