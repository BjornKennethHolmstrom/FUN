// src/server/__tests__/auth.test.ts
import { createInnerTRPCContext } from '../context';
import { appRouter } from '../routers';
import { testPrisma } from './prisma';
import { tokenService } from '../../lib/auth/redis';
import { hashPassword } from '../../lib/auth/password';
import { verifyAccessToken } from '../../lib/auth/jwt';

// Helper function to clean the database
async function cleanDatabase() {
  await testPrisma.eventRSVP.deleteMany({});
  await testPrisma.event.deleteMany({});
  await testPrisma.groupMember.deleteMany({});
  await testPrisma.group.deleteMany({});
  await testPrisma.achievement.deleteMany({});
  await testPrisma.resource.deleteMany({});
  await testPrisma.contribution.deleteMany({});
  await testPrisma.comment.deleteMany({});
  await testPrisma.post.deleteMany({});
  await testPrisma.campaign.deleteMany({});
  await testPrisma.idea.deleteMany({});
  await testPrisma.user.deleteMany({});
}

// Mock Redis
jest.mock('../../lib/auth/redis', () => {
  const tokens = new Map<string, string>();
  return {
    tokenService: {
      createRefreshToken: jest.fn(async (userId: string) => {
        const tokenId = 'test-refresh-token';
        tokens.set(tokenId, userId);
        return {
          id: tokenId,
          userId,
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };
      }),
      validateRefreshToken: jest.fn(async (tokenId: string) => 
        tokens.get(tokenId) || null
      ),
      invalidateRefreshToken: jest.fn(async (tokenId: string) => {
        tokens.delete(tokenId);
      }),
      invalidateAllUserTokens: jest.fn(async (userId: string) => {
        for (const [key, value] of tokens.entries()) {
          if (value === userId) {
            tokens.delete(key);
          }
        }
      }),
    },
  };
});

describe('Authentication', () => {
  let userId: string;
  const userEmail = 'test@example.com';
  const userPassword = 'testpassword123';

  // Setup before all tests
  beforeAll(async () => {
    await cleanDatabase();

    // Create test user
    const hashedPw = await hashPassword(userPassword);
    const user = await testPrisma.user.create({
      data: {
        email: userEmail,
        name: 'Test User',
        password: hashedPw,
        stage: 'EGG',
        interests: []
      },
    });
    userId = user.id;
  });

  // Cleanup after all tests
  afterAll(async () => {
    await cleanDatabase();
    await testPrisma.$disconnect();
  });

  describe('Login', () => {
    it('should successfully login with correct credentials', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const result = await caller.auth.login({
        email: userEmail,
        password: userPassword,
      });

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(userEmail);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();

      const payload = verifyAccessToken(result.accessToken);
      expect(payload).toBeDefined();
      expect(payload?.userId).toBe(userId);
    });

    it('should fail with incorrect password', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      await expect(caller.auth.login({
        email: userEmail,
        password: 'wrongpassword',
      })).rejects.toThrow('Invalid password');
    });

    it('should fail with non-existent email', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      await expect(caller.auth.login({
        email: 'nonexistent@example.com',
        password: userPassword,
      })).rejects.toThrow('No user found with this email');
    });
  });

  describe('Token Refresh', () => {
    it('should issue new tokens with valid refresh token', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      // First login to get tokens
      const loginResult = await caller.auth.login({
        email: userEmail,
        password: userPassword,
      });

      // Try refreshing tokens
      const refreshResult = await caller.auth.refresh({
        refreshToken: loginResult.refreshToken,
      });

      expect(refreshResult.accessToken).toBeDefined();
      expect(refreshResult.refreshToken).toBeDefined();
      expect(refreshResult.user.id).toBe(userId);
    });

    it('should fail with invalid refresh token', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      await expect(caller.auth.refresh({
        refreshToken: 'invalid-token',
      })).rejects.toThrow('Invalid refresh token');
    });
  });

  describe('Protected Routes', () => {
    it('should access protected route with valid token', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      // First login to get tokens
      const { accessToken } = await caller.auth.login({
        email: userEmail,
        password: userPassword,
      });

      // Create authenticated context
      const authedCaller = appRouter.createCaller({
        ...createInnerTRPCContext(),
        req: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        } as any,
      });

      // Try accessing protected route
      const session = await authedCaller.auth.getSession();
      expect(session.user.id).toBe(userId);
    });

    it('should fail accessing protected route without token', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      await expect(caller.auth.getSession()).rejects.toThrow('Missing authorization header');
    });

    it('should fail accessing protected route with invalid token', async () => {
      const caller = appRouter.createCaller({
        ...createInnerTRPCContext(),
        req: {
          headers: {
            authorization: 'Bearer invalid-token',
          },
        } as any,
      });

      await expect(caller.auth.getSession()).rejects.toThrow('Invalid or expired token');
    });
  });

  describe('Logout', () => {
    it('should successfully logout from single device', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      // First login
      const { accessToken, refreshToken } = await caller.auth.login({
        email: userEmail,
        password: userPassword,
      });

      // Create authenticated context
      const authedCaller = appRouter.createCaller({
        ...createInnerTRPCContext(),
        req: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        } as any,
      });

      // Logout
      const result = await authedCaller.auth.logout({ refreshToken });
      expect(result.success).toBe(true);

      // Verify refresh token is invalidated
      await expect(caller.auth.refresh({
        refreshToken,
      })).rejects.toThrow('Invalid refresh token');
    });

    it('should successfully logout from all devices', async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      // First login
      const { accessToken } = await caller.auth.login({
        email: userEmail,
        password: userPassword,
      });

      // Create authenticated context
      const authedCaller = appRouter.createCaller({
        ...createInnerTRPCContext(),
        req: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        } as any,
      });

      // Logout from all devices
      const result = await authedCaller.auth.logoutAll();
      expect(result.success).toBe(true);

      // Verify tokenService was called
      expect(tokenService.invalidateAllUserTokens).toHaveBeenCalledWith(userId);
    });
  });
});
