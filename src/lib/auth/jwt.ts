// src/lib/auth/jwt.ts
import { sign, verify } from 'jsonwebtoken';
import type { User } from '.prisma/client';  // Using type import instead

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  stage: string;
}

export function generateAccessToken(user: Pick<User, 'id' | 'email' | 'stage'>): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    stage: user.stage,
  };
  
  return sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
