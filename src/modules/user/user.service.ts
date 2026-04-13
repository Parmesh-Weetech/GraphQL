import { CustomExceptionFactory } from "../../exception/custom-exception-factory.ts";
import { randomBytes } from "node:crypto";
import { ErrorCodes } from "../../exception/error-codes.ts";
import type { User } from "./types/user.type.ts";
import { UserRepository } from "./user.reporsitory.ts";
import { createHashPassword, verifyPassword } from "./utils/passwordHash.ts";
import { generateAuthTokens } from "./utils/generateAuthTokens.ts";

const userRepository = new UserRepository();

export class UserService {
    async createUser(name: string, email: string, password: string): Promise<User> {
        const existingUser = await userRepository.findUserByEmail(email);

        if (existingUser) {
            throw CustomExceptionFactory.create(ErrorCodes.USER_EXISTS);
        }

        const salt = randomBytes(16).toString("hex");
        const hashedPassword = createHashPassword(password, salt);

        const user = userRepository.createUser(
            name,
            email,
            hashedPassword.hashPassword,
            hashedPassword.salt
        );
        return user;
    }

    async findAllUsers(): Promise<User[]> {
        const users = userRepository.findAllUsers();
        return users;
    }

    async findUserById(id: string): Promise<User | null> {
        const user = userRepository.findUserById(id);
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = userRepository.findUserByEmail(email);
        return user;
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            throw CustomExceptionFactory.create(ErrorCodes.USER_NOT_FOUND);
        }

        const isPasswordValid = verifyPassword(password, user.salt, user.password);

        if (!isPasswordValid) {
            throw CustomExceptionFactory.create(ErrorCodes.INVALID_CREDENTIALS);
        }

        const tokens = await generateAuthTokens(user.id, user.email, user.userRole || 'USER');
        return tokens;
    }
}
