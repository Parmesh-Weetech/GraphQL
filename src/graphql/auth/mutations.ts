import { UserService } from '../../modules/user/user.service.ts';

const userService = new UserService();

export const authMutations = {
    login: async (_parent: undefined, args: { loginPayload: { email: string; password: string } }) => {
        const { email, password } = args.loginPayload;

        const tokens = await userService.login(email, password);

        return tokens;
    },
};