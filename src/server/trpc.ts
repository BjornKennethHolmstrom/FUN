// src/server/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import { verifyAccessToken } from '../lib/auth/jwt';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to check authentication
const isAuthed = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.authorization;
  
  if (!authHeader) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Missing authorization header',
    });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid or expired token',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: {
        id: payload.userId,
        email: payload.email,
        stage: payload.stage,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
