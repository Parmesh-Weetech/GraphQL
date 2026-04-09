import pool from "../../config/db.ts";
import type { OrderItem, OrderItemRow } from "../order/types/order.type.ts";
import { findOrderById } from "./order.service.ts";
import { findProductById } from "../product/product.service.ts";

const mapOrderItem = async (row: OrderItemRow): Promise<OrderItem | null> => {
    const [order, product] = await Promise.all([
        findOrderById(row.order_id),
        findProductById(row.product_id)
    ]);

    if (!order || !product) {
        return null;
    }

    return {
        id: row.id,
        cart: {
            id: row.id,
            product: {
                id: product.id,
                name: product.name,
                price: Number(product.price)
            },
            quantity: row.quantity
        },
        order
    };
};

export const findOrderItemById = async (id: string) => {
    const result = await pool.query<OrderItemRow>(
        "SELECT id, order_id, product_id, quantity FROM order_items WHERE id = $1 LIMIT 1",
        [id]
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return mapOrderItem(row);
};

export const findAllOrderItems = async () => {
    const result = await pool.query<OrderItemRow>(
        "SELECT id, order_id, product_id, quantity FROM order_items"
    );
    const items: OrderItem[] = [];

    for (const row of result.rows) {
        const item = await mapOrderItem(row);
        if (item) {
            items.push(item);
        }
    }

    return items;
};

export const addOrderItem = async (orderId: string, productId: string, quantity: number) => {
    const result = await pool.query<OrderItemRow>(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id, order_id, product_id, quantity",
        [orderId, productId, quantity]
    );

    return mapOrderItem(result.rows[0]);
};
