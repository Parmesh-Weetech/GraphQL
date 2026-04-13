import { UserService } from "../../modules/user/user.service.ts";

const userService = new UserService();

export const userQueries = {
    users: async () => userService.findAllUsers(),
    user: async (_parent: undefined, args: { userId: string }) => userService.findUserById(args.userId)
};