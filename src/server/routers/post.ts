// src/server/routers/post.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const postRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });
  }),
});
