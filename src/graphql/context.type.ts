export interface AccessTokenContext {
    user: { userId: string; email: string, userRole: string } | null;
}

export interface RefreshTokenContext {
    user: { userId: string, userRole: string } | null;
}