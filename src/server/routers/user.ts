// src/server/routers/user.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input },
      });
    }),
});

