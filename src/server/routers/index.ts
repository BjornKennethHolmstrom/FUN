// src/server/routers/index.ts
import { router } from '../trpc';
import { userRouter } from './user';
import { postRouter } from './post';
import { authRouter } from './auth';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
