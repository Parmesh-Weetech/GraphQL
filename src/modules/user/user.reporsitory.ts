import type { User } from "./types/user.type.ts";
import pool from "../../config/db.ts";

export class UserRepository {
    async createUser(name: string, email: string, password: string, salt: string): Promise<User> {
        const result = await pool.query<User>(
            'INSERT INTO users (name, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password, salt',
            [name, email, password, salt]
        );

        const createdUser = result.rows[0];

        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            salt: createdUser.salt,
            userRole: 'USER'
        };
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const result = await pool.query<User>(
            'SELECT id, name, email, password, salt, "userRole" FROM users WHERE email = $1 LIMIT 1',
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            salt: user.salt,
            userRole: user.userRole || 'USER'
        };
    }

    async findUserById(id: string): Promise<User | null> {
        const result = await pool.query<User>(
            'SELECT id, name, email, password, salt FROM users WHERE id = $1 LIMIT 1',
            [id]
        );

        const user = result.rows[0];

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            salt: user.salt,
            userRole: user.userRole || 'USER'
        };
    }

    async findAllUsers(): Promise<User[]> {
        const result = await pool.query<User>('SELECT id, name, email, password, salt FROM users');

        return result.rows.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            salt: user.salt
        }));
    }
}