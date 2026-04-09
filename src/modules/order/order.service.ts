import pool from "../../config/db.ts";
import type { OrderRow } from "./types/order.type.ts";

const normalizeOrderRow = (order: OrderRow) => ({
    id: order.id,
    total: typeof order.total === "string" ? Number(order.total) : order.total
});

export const findOrderById = async (id: string) => {
    const result = await pool.query<OrderRow>(
        "SELECT id, total FROM orders WHERE id = $1 LIMIT 1",
        [id]
    );

    const order = result.rows[0];

    return order ? normalizeOrderRow(order) : null;
};

export const findAllOrders = async () => {
    const result = await pool.query<OrderRow>("SELECT id, total FROM orders");

    return result.rows.map(normalizeOrderRow);
};

export const addOrder = async (total: number) => {
    const result = await pool.query<OrderRow>(
        "INSERT INTO orders (total) VALUES ($1) RETURNING id, total",
        [total]
    );

    return normalizeOrderRow(result.rows[0]);
};
