import { CustomExceptionFactory } from "../../exception/custom-exception-factory.ts";
import { ErrorCodes } from "../../exception/error-codes.ts";
import { UserRole } from "../../modules/user/types/user.type.ts";
import { UserService } from "../../modules/user/user.service.ts";

const userService = new UserService();

export const userMutations = {
    createUser: async (_parent: undefined, args: { name: string; email: string, password: string }, context: { user: { userId: string; email: string, userRole: string } | null }) => {
        return userService.createUser(args.name, args.email, args.password);
    }
};