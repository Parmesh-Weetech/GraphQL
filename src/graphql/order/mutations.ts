import { clearCartItems, findAllCartItems } from "../../modules/cart/cart.service.ts";
import { addOrderItem } from "../../modules/order/order-item.service.ts";
import { addOrder, findOrderById } from "../../modules/order/order.service.ts";

export const orderMutations = {
    placeOrder: async (_parent: undefined, _args: unknown, context: { user: { userId: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }

        const cartItems = await findAllCartItems(context.user.userId);

        if (cartItems.length === 0) {
            throw new Error("Cart is empty");
        }

        const total = cartItems.reduce((sum, cartItem) => {
            return sum + cartItem.product.price * cartItem.quantity;
        }, 0);

        const order = await addOrder(total, context.user.userId, cartItems);

        for (const cartItem of cartItems) {
            await addOrderItem(order.id, cartItem.product.id, cartItem.quantity, cartItem.product.price);
        }

        await clearCartItems(context.user.userId);
        
        return findOrderById(order.id);
    }
};