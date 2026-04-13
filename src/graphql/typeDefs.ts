import { userTypeDefs } from "./user/index.ts";
import { productTypeDefs } from "./product/index.ts";
import { cartTypeDefs } from "./cart/index.ts";
import { orderTypeDefs } from "./order/index.ts";
import { authTypeDefs } from "./auth/index.ts";
import { baseTypeDefs } from "./baseTypeDefs.ts";

export const typeDefs = [
    baseTypeDefs,
    userTypeDefs,
    productTypeDefs,
    cartTypeDefs,
    orderTypeDefs,
    authTypeDefs
]