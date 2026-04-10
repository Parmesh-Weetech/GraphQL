import { findAllCartItems, findCartItemById } from "../../modules/cart/cart.service.ts";

export const cartQueries = {
    cart: async (_parent: undefined, args: { userId: string }) => {
        const items = await findAllCartItems(args.userId);
        return { items };
    },
    cartItems: async (_parent: undefined, args: { userId: string }) => findAllCartItems(args.userId),
    cartItem: async (_parent: undefined, args: { id: string }) => findCartItemById(args.id)
};