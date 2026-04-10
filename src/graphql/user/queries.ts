import { addUser, findAllUsers, findUserById } from "../../modules/user/user.service.ts";

export const userQueries = {
    users: async () => findAllUsers(),
    user: async (_parent: undefined, args: { userId: string }) => findUserById(args.userId)
};