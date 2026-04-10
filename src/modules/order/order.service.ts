import pool from "../../config/db.ts";
import type { Order, OrderItemRow } from "./types/order.type.ts";

export const findOrderById = async (id: string): Promise<Order | null> => {
    const result = await pool.query<any>(
        'SELECT id, total, "userId", status FROM orders WHERE id = $1 LIMIT 1',
        [id]
    );

    const order = result.rows[0];

    if (!order) return null;

    return {
        id: order.id,
        total: Number(order.total),
        userId: order.userId,
        status: order.status,
        items: []
    };
};

export const findAllOrders = async (userId: string): Promise<Order[]> => {
    const result = await pool.query<any>('SELECT id, total, "userId", status FROM orders WHERE "userId" = $1', [userId]);

    return result.rows.map((order: any) => ({
        id: order.id,
        total: Number(order.total),
        userId: order.userId,
        status: order.status
    }));
};

export const addOrder = async (total: number, userId: string, cartItems: { product: { id: string }, quantity: number, price: number }[]): Promise<Order> => {
    const orderResult: {
        rows: [
            {
                id: string,
                total: string,
                userId: string,
                status: string
            }
        ]
    } = await pool.query(
        'INSERT INTO orders (total, "userId", status) VALUES ($1, $2, $3) RETURNING id, total, "userId", status',
        [total, userId, "Pending"]
    );

    const insertOrderItemQueries: OrderItemRow[] = cartItems.map(cartItem => {
        return pool.query(
            'INSERT INTO order_items ("orderId", "productId", quantity, price, "totalPrice") VALUES ($1, $2, $3, $4, $5)',
            [orderResult.rows[0].id, cartItem.product.id, cartItem.quantity, cartItem.price, cartItem.quantity * cartItem.price]
        );
    });

    const orderItems: OrderItemRow[] = await Promise.all(insertOrderItemQueries);

    return {
        id: orderResult.rows[0].id,
        total: Number(orderResult.rows[0].total),
        userId: orderResult.rows[0].userId,
        status: orderResult.rows[0].status,
        items: orderItems.map(orderItem => ({
            id: orderItem.id,
            orderId: orderResult.rows[0].id,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
            price: orderItem.price,
            totalPrice: orderItem.totalPrice
        }))
    };
};

