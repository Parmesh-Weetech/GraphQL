import { cartTypeDefs } from "../modules/cart/cart.schema.ts";
import { orderTypeDefs } from "../modules/order/order.schema.ts";
import { productTypeDefs } from "../modules/product/product.schema.ts";
import { userTypeDefs } from "../modules/user/user.schema.ts";

export const typeDefs = [
    userTypeDefs,
    productTypeDefs,
    cartTypeDefs,
    orderTypeDefs
]