import { userTypeDefs } from "./user/index.ts";
import { productTypeDefs } from "./product/index.ts";
import { cartTypeDefs } from "./cart/index.ts";
import { orderTypeDefs } from "./order/index.ts";

export const typeDefs = [
    userTypeDefs,
    productTypeDefs,
    cartTypeDefs,
    orderTypeDefs
]