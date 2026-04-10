import { clearCartItems, findAllCartItems } from "../../modules/cart/cart.service.ts";
import { addOrderItem } from "../../modules/order/order-item.service.ts";
import { addOrder, findOrderById } from "../../modules/order/order.service.ts";

export const orderMutations = {
    placeOrder: async (_parent: undefined, args: { userId: string }) => {
        const cartItems = await findAllCartItems(args.userId);

        if (cartItems.length === 0) {
            throw new Error("Cart is empty");
        }

        const total = cartItems.reduce((sum, cartItem) => {
            return sum + cartItem.product.price * cartItem.quantity;
        }, 0);

        const order = await addOrder(total, args.userId, cartItems);

        for (const cartItem of cartItems) {
            await addOrderItem(order.id, cartItem.product.id, cartItem.quantity, cartItem.product.price);
        }

        await clearCartItems(args.userId);
        
        return findOrderById(order.id);
    }
};