import { addCartItem, clearCartItems, removeCartItem } from "../../modules/cart/cart.service.ts";

export const cartMutations = {
    addToCart: async (_parent: undefined, args: { productId: string; quantity: number }, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        return addCartItem(args.productId, args.quantity, context.user.userId);
    },

    removeFromCart: async (_parent: undefined, args: { id: string }, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        await removeCartItem(args.id);
        return true;
    },

    clearCart: async (_parent: undefined, _args: unknown, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        await clearCartItems(context.user.userId);
        return true;
    }
};