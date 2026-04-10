import { addUser, findAllUsers, findUserById } from "./user.service.ts";

export const userResolvers = {
    Query: {
        users: async () => findAllUsers(),
        user: async (_parent: undefined, args: { userId: string }) => {
            return findUserById(args.userId);
        }
    },
    Mutation: {
        addUser: async (_parent: undefined, args: { name: string; email: string }) => {
            return addUser(args.name, args.email);
        }
    }
};