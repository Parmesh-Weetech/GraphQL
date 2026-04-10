import { findAllOrders, findOrderById } from "../../modules/order/order.service.ts";

export const orderQueries = {
    orders: async (_parent: undefined, args: { userId: string }) => findAllOrders(args.userId),
    order: async (_parent: undefined, args: { id: string }) => findOrderById(args.id)
};