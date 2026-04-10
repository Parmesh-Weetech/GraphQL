import { findAllProducts, findProductById } from "../../modules/product/product.service.ts";

export const productQueries = {
    products: async () => findAllProducts(),
    product: async (_parent: undefined, args: { id: string }) => findProductById(args.id)
};