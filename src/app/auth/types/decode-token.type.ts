export type AccessTokenContext = {
    user: { userId: string; email: string, userRole: string } | null;
}

export type RefreshTokenContext = {
    user: { userId: string, userRole: string } | null;
}