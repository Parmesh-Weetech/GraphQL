import { addCartItem, clearCartItems, findAllCartItems, findCartItemById, removeCartItem } from "./cart.service.ts";

export const cartResolvers = {
    Query: {
        cart: async (_parent: undefined, args: { userId: string }) => {
            const items = await findAllCartItems(args.userId);
            return { items };
        },
        cartItems: async (_parent: undefined, args: { userId: string }) => findAllCartItems(args.userId),
        cartItem: async (_parent: undefined, args: { id: string }) => findCartItemById(args.id)
    },
    Mutation: {
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
    }
};