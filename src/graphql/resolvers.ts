import { addCartItem, clearCartItems, findAllCartItems, findCartItemById } from "../modules/cart/cart-item.service.ts";
import {
    addOrderItem,
    findAllOrderItems,
    findOrderItemById
} from "../modules/order/order-item.service.ts";
import { addOrder, findAllOrders, findOrderById } from "../modules/order/order.service.ts";
import { addProduct, findAllProducts, findProductById } from "../modules/product/product.service.ts";

export const resolvers = {
    Query: {
        products: async () => findAllProducts(),
        product: async (_parent: undefined, args: { id: string }) => findProductById(args.id),
        cartItems: async () => findAllCartItems(),
        cartItem: async (_parent: undefined, args: { id: string }) => findCartItemById(args.id),
        orders: async () => findAllOrders(),
        order: async (_parent: undefined, args: { id: string }) => findOrderById(args.id),
        orderItems: async () => findAllOrderItems(),
        orderItem: async (_parent: undefined, args: { id: string }) => findOrderItemById(args.id)
    },
    Mutation: {
        addProduct: async (_parent: undefined, args: { name: string; price: number }) =>
            addProduct(args.name, args.price),
        addToCart: async (_parent: undefined, args: { productId: string; quantity: number }) =>
            addCartItem(args.productId, args.quantity),
        placeOrder: async () => {
            const cartItems = await findAllCartItems();

            const total = cartItems.reduce((sum, cartItem) => {
                return sum + cartItem.product.price * cartItem.quantity;
            }, 0);

            const order = await addOrder(total);

            for (const cartItem of cartItems) {
                await addOrderItem(order.id, cartItem.product.id, cartItem.quantity);
            }

            await clearCartItems();
            return order;
        }
    }
};
