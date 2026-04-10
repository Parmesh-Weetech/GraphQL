import { addProduct, removeProduct } from "../../modules/product/product.service.ts";

export const productMutations = {
    addProduct: async (_parent: undefined, args: { name: string; price: number }) =>
        addProduct(args.name, args.price),

    removeProduct: async (_parent: undefined, args: { id: string }) => removeProduct(args.id)
};