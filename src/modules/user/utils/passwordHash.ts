import { createHmac, randomBytes } from "node:crypto";


export const createHashPassword = (password: string, salt: string): {
    salt: string;
    hashPassword: string;
} => {
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    return {
        salt,
        hashPassword: hash
    }
}

export const verifyPassword = (password: string, salt: string, hashPassword: string): boolean => {
    const hash = createHmac("sha256", salt).update(password).digest("hex");
    return hash === hashPassword;
}