import { addProduct, removeProduct } from "../../modules/product/product.service.ts";
import { UserRole } from "../../modules/user/types/user.type.ts";

export const productMutations = {
    addProduct: async (_parent: undefined, args: { name: string; price: number }, context: { user: { userId: string; email: string, userRole: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }

        if (context.user.userRole !== UserRole.ADMIN) {
            throw new Error("Forbidden");
        }

        return addProduct(args.name, args.price);
    },

    removeProduct: async (_parent: undefined, args: { id: string }, context: { user: { userId: string; email: string, userRole: string } | null }) => {
        if (!context.user) {
            throw new Error("Unauthorized");
        }

        if (context.user.userRole !== UserRole.ADMIN) {
            throw new Error("Forbidden");
        }

        return removeProduct(args.id);
    }
};