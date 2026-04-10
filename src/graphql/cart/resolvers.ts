import { cartQueries } from "./queries.ts";
import { cartMutations } from "./mutations.ts";

export const cartResolvers = {
    Query: cartQueries,
    Mutation: cartMutations
};