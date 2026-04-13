import { findAllCartItems, findCartItemById } from "../../modules/cart/cart.service.ts";

export const cartQueries = {
    cart: async (_parent: undefined, _args: unknown, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        const items = await findAllCartItems(context.user.userId);
        return { items };
    },
    cartItems: async (_parent: undefined, _args: unknown, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        return findAllCartItems(context.user.userId);
    },
    cartItem: async (_parent: undefined, args: { id: string }) => findCartItemById(args.id)
};