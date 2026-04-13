export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    userRole: string;
};

export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];