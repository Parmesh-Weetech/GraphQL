import pool from "../../config/db.ts";
import { CustomExceptionFactory } from "../../exception/custom-exception-factory.ts";
import { ErrorCodes } from "../../exception/error-codes.ts";
import type { User } from "./types/user.type.ts";
import { UserRepository } from "./user.reporsitory.ts";
import { createHashPassword } from "./utils/passwordHash.ts";

const userRepository = new UserRepository();

export class UserService {
    async createUser(name: string, email: string, password: string): Promise<User> {
        const existingUser = await userRepository.findUserByEmail(email);

        if (existingUser) {
            throw CustomExceptionFactory.create(ErrorCodes.USER_EXISTS);
        }

        const hashedPassword = createHashPassword(password);

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
}
