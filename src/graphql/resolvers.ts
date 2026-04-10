import { userResolvers } from "./user/index.ts";
import { productResolvers } from "./product/index.ts";
import { cartResolvers } from "./cart/index.ts";
import { orderResolvers } from "./order/index.ts";

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
    }
};