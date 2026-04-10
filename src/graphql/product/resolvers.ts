import { productQueries } from "./queries.ts";
import { productMutations } from "./mutations.ts";

export const productResolvers = {
    Query: productQueries,
    Mutation: productMutations
};