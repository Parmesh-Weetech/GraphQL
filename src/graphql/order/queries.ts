import { findAllOrders, findOrderById } from "../../modules/order/order.service.ts";

export const orderQueries = {
    orders: async (_parent: undefined, _args: unknown, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        return findAllOrders(context.user.userId);
    },
    order: async (_parent: undefined, args: { id: string }) => findOrderById(args.id)
};