import { userQueries } from "./queries.ts";
import { userMutations } from "./mutations.ts";

export const userResolvers = {
    Query: userQueries,
    Mutation: userMutations
};