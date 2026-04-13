import { UserService } from "../../modules/user/user.service.ts";

const userService = new UserService();

export const userMutations = {
    createUser: async (_parent: undefined, args: { name: string; email: string, password: string }) => {
        return userService.createUser(args.name, args.email, args.password);
    }
};