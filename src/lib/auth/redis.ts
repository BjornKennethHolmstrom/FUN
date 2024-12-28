// src/lib/auth/redis.ts
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export interface RefreshToken {
  id: string;
  userId: string;
  expiresAt: number;
}

export class TokenService {
  private readonly redis: Redis;
  private readonly refreshTokenExpiry: number = 30 * 24 * 60 * 60; // 30 days in seconds

  constructor() {
    this.redis = redis;
  }

  async createRefreshToken(userId: string): Promise<RefreshToken> {
    const token: RefreshToken = {
      id: uuidv4(),
      userId,
      expiresAt: Date.now() + this.refreshTokenExpiry * 1000,
    };

    // Store in Redis with expiration
    await this.redis.setex(
      `refresh_token:${token.id}`,
      this.refreshTokenExpiry,
      JSON.stringify({ userId: token.userId, expiresAt: token.expiresAt })
    );

    return token;
  }

  async validateRefreshToken(tokenId: string): Promise<string | null> {
    const data = await this.redis.get(`refresh_token:${tokenId}`);
    if (!data) return null;

    const token = JSON.parse(data);
    if (Date.now() > token.expiresAt) {
      await this.redis.del(`refresh_token:${tokenId}`);
      return null;
    }

    return token.userId;
  }

  async invalidateRefreshToken(tokenId: string): Promise<void> {
    await this.redis.del(`refresh_token:${tokenId}`);
  }

  async invalidateAllUserTokens(userId: string): Promise<void> {
    // In a production environment, we'd want to use a scan operation
    // for better performance with large datasets
    const keys = await this.redis.keys('refresh_token:*');
    for (const key of keys) {
      const data = await this.redis.get(key);
      if (data) {
        const token = JSON.parse(data);
        if (token.userId === userId) {
          await this.redis.del(key);
        }
      }
    }
  }
}

// Create a singleton instance
export const tokenService = new TokenService();


