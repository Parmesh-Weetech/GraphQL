import { cartResolvers } from "../modules/cart/cart.resolver.ts";
import { orderResolvers } from "../modules/order/order.resolver.ts";
import { productResolvers } from "../modules/product/product.resolver.ts";
import { userResolvers } from "../modules/user/user.resolver.ts";
import { findAllOrderItems } from "../modules/order/order-item.service.ts";
import { findUserById } from "../modules/user/user.service.ts";

export const resolvers = {
    Query: {
        ...orderResolvers.Query,
        ...cartResolvers.Query,
        ...productResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...orderResolvers.Mutation,
        ...cartResolvers.Mutation,
        ...productResolvers.Mutation,
        ...userResolvers.Mutation
    },
    CartItem: {
        user: async (parent: { userId: string }) => findUserById(parent.userId)
    },
    Order: {
        user: async (parent: { userId: string }) => findUserById(parent.userId),
        items: async (parent: { id: string }) => {
            const allItems = await findAllOrderItems();
            return allItems.filter((item: any) => item.orderId === parent.id);
        }
    },
    OrderItem: {
        product: async (parent: { productId: string }, _args: any, { loaders }: any) => {
            if (loaders?.product) {
                return loaders.product.load(parent.productId);
            }
            const { findProductById } = await import("../modules/product/product.service.ts");
            return findProductById(parent.productId);
        }
    }
};
