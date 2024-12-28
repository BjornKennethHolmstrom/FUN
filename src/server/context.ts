// src/server/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface User {
  id: string;
  email: string;
  stage: string;
}

interface CreateContextOptions {
  user?: User;
  req: trpcNext.CreateNextContextOptions['req'];
  res: trpcNext.CreateNextContextOptions['res'];
}

// Helper to create context for tests without the Next.js req/res
export function createInnerTRPCContext(opts: Partial<CreateContextOptions> = {}) {
  return {
    req: opts.req || {
      headers: {},
    } as any,
    res: opts.res || {} as any,
    user: opts.user,
  };
}

// Create context for Next.js API routes
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const innerContext = createInnerTRPCContext({
    req: opts.req,
    res: opts.res,
  });

  return innerContext;
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
