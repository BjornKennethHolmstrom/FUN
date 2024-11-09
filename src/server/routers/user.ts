// src/server/routers/user.ts

import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';
import { hashPassword, generateToken } from '../../lib/auth';
import { TRPCError } from '@trpc/server';
import { Stage } from '@prisma/client';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  location: z.string().optional(),
  interests: z.array(z.string()),
  motivation: z.string().optional(),
  startingPath: z.enum(['personal', 'community', 'global']),
  preferredLanguage: z.string().default('en'),
  subscribeToUpdates: z.boolean().default(true),
});

export const userRouter = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already registered',
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(input.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: input.email,
          hashedPassword,
          name: input.name,
          location: input.location,
          interests: input.interests,
          motivation: input.motivation,
          startingPath: input.startingPath,
          stage: Stage.EGG, // Using the enum
          preferredLanguage: input.preferredLanguage,
          subscribeToUpdates: input.subscribeToUpdates,
        },
      });

      // Generate JWT token
      const token = generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          stage: user.stage,
        },
        token,
      };
    }),

  // Add other user-related procedures here
});
