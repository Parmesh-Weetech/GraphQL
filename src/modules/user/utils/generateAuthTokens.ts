import jwt from 'jsonwebtoken';
import type { RefreshTokenContext, AccessTokenContext } from '../../../graphql/context.type.ts';

export async function generateAuthTokens(userId: string, email: string, userRole: string): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = jwt.sign({ userId, email, userRole }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId, userRole }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

    return {
        accessToken,
        refreshToken,
    };
}

export async function verifyAccessToken(token: string): Promise<AccessTokenContext | null> {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string; email: string, userRole: string };
        return { user: decoded };
    } catch (err) {
        console.error('Invalid access token:', err);
        return null;
    }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenContext | null> {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string, userRole: string };
        return { user: decoded };
    } catch (err) {
        console.error('Invalid refresh token:', err);
        return null;
    }
}