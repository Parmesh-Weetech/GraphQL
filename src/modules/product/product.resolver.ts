import { addProduct, findAllProducts, findProductById, removeProduct } from "./product.service.ts";

export const productResolvers = {
    Query: {
        products: async () => findAllProducts(),
        product: async (_parent: undefined, args: { id: string }) => findProductById(args.id)
    },
    Mutation: {
        addProduct: async (_parent: undefined, args: { name: string; price: number }) =>
            addProduct(args.name, args.price),

        removeProduct: async (_parent: undefined, args: { id: string }) => removeProduct(args.id)
    }
};