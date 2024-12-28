// src/server/routers/auth.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '../db';
import { verifyPassword } from '../../lib/auth/password';
import { tokenService } from '../../lib/auth/redis';
import { createAuthTokens } from '../../lib/auth/session';
import { verifyAccessToken } from '../../lib/auth/jwt';
import { Stage } from '@prisma/client';

// Authentication schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

interface UserAuthInfo {
  id: string;
  email: string;
  stage: Stage;
}

export const authRouter = router({
  // Login endpoint
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      // Find user and explicitly select password field
      const user = await prisma.user.findUnique({
        where: { email: input.email },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          stage: true,
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No user found with this email',
        });
      }

      // Verify password
      const isValid = await verifyPassword(input.password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password',
        });
      }

      // User info for token generation
      const userAuthInfo: UserAuthInfo = {
        id: user.id,
        email: user.email,
        stage: user.stage,
      };

      // Generate tokens
      const tokens = await createAuthTokens(userAuthInfo);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          stage: user.stage,
        },
        ...tokens,
      };
    }),

  // Logout endpoint
  logout: protectedProcedure
    .input(z.object({ refreshToken: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await tokenService.invalidateRefreshToken(input.refreshToken);
      return { success: true };
    }),

  // Logout from all devices
  logoutAll: protectedProcedure
    .mutation(async ({ ctx }) => {
      await tokenService.invalidateAllUserTokens(ctx.user.id);
      return { success: true };
    }),

  // Refresh token endpoint
  refresh: publicProcedure
    .input(refreshSchema)
    .mutation(async ({ input }) => {
      const userId = await tokenService.validateRefreshToken(input.refreshToken);
      
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid refresh token',
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          stage: true,
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // User info for token generation
      const userAuthInfo: UserAuthInfo = {
        id: user.id,
        email: user.email,
        stage: user.stage,
      };

      // Generate new tokens
      const tokens = await createAuthTokens(userAuthInfo);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          stage: user.stage,
        },
        ...tokens,
      };
    }),

  // Get current session
  getSession: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await prisma.user.findUnique({
        where: { id: ctx.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          stage: true,
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return { user };
    }),
});
