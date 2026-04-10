import pool from "../../config/db.ts";
import type { OrderItem, OrderItemRow } from "../order/types/order.type.ts";
import { findOrderById } from "./order.service.ts";
import { findProductById } from "../product/product.service.ts";

const mapOrderItem = async (row: OrderItemRow): Promise<OrderItem | null> => {
    const [order, product] = await Promise.all([
        findOrderById(row.orderId),
        findProductById(row.productId)
    ]);

    if (!order || !product) {
        return null;
    }

    return {
        id: row.id,
        orderId: row.orderId,
        product,
        quantity: row.quantity,
        price: row.price,
        totalPrice: row.totalPrice
    };
};

export const findOrderItemById = async (id: string) => {
    const result = await pool.query<OrderItemRow>(
        "SELECT id, orderId, productId, quantity, price, totalPrice FROM order_items WHERE id = $1 LIMIT 1",
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
        "SELECT id, orderId, productId, quantity, price, totalPrice FROM order_items"
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

export const addOrderItem = async (orderId: string, productId: string, quantity: number, price: number) => {
    const result = await pool.query<OrderItemRow>(
        "INSERT INTO order_items (orderId, productId, quantity, price, totalPrice) VALUES ($1, $2, $3, $4, $5) RETURNING id, orderId, productId, quantity, price, totalPrice",
        [orderId, productId, quantity, price, price * quantity]
    );

    return mapOrderItem(result.rows[0]);
};
