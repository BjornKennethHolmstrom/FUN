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

// src/server/routers/index.ts
import { router } from '../trpc';
import { userRouter } from './user';
import { postRouter } from './post';

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
