import { orderQueries } from "./queries.ts";
import { orderMutations } from "./mutations.ts";

export const orderResolvers = {
    Query: orderQueries,
    Mutation: orderMutations
};