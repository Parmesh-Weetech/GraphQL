import { CustomExceptionFactory } from "../../exception/custom-exception-factory.ts";
import { ErrorCodes } from "../../exception/error-codes.ts";
import { UserService } from "../../modules/user/user.service.ts";

const userService = new UserService();

export const userMutations = {
    createUser: async (_parent: undefined, args: { name: string; email: string, password: string }, context: { user: { userId: string; email: string, userRole: string } | null }) => {
        if (!context.user) {
            throw CustomExceptionFactory.create(ErrorCodes.UNAUTHORIZED);
        }

        console.log('User Role in Context:', context.user.userRole);

        if(context.user.userRole !== 'ADMIN') {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return userService.createUser(args.name, args.email, args.password);
    }
};