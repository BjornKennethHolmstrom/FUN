// src/lib/auth/session.ts
import { tokenService } from './redis';
import { generateAccessToken } from './jwt';
import { Stage } from '@prisma/client';

interface UserAuthInfo {
  id: string;
  email: string;
  stage: Stage;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export async function createAuthTokens(user: UserAuthInfo): Promise<AuthTokens> {
  const refreshToken = await tokenService.createRefreshToken(user.id);
  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    refreshToken: refreshToken.id,
    expiresAt: refreshToken.expiresAt,
  };
}

