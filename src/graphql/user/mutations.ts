import { addUser } from "../../modules/user/user.service.ts";

export const userMutations = {
    addUser: async (_parent: undefined, args: { name: string; email: string }) => addUser(args.name, args.email)
};