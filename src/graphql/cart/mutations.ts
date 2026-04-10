import { addCartItem, clearCartItems, removeCartItem } from "../../modules/cart/cart.service.ts";

export const cartMutations = {
    addToCart: async (_parent: undefined, args: { productId: string; quantity: number; userId: string }) =>
        addCartItem(args.productId, args.quantity, args.userId),

    removeFromCart: async (_parent: undefined, args: { id: string }) => {
        await removeCartItem(args.id);
        return true;
    },

    clearCart: async (_parent: undefined, args: { userId: string }) => {
        await clearCartItems(args.userId);
        return true;
    }
};