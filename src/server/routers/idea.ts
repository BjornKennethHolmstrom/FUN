// src/server/routers/idea.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const ideaRouter = router({
  getAll: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      stage: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return await prisma.idea.findMany({
        where: {
          ...(input.category && input.category !== 'all' 
            ? { category: input.category } 
            : {}),
          ...(input.search 
            ? {
                OR: [
                  { title: { contains: input.search, mode: 'insensitive' } },
                  { description: { contains: input.search, mode: 'insensitive' } },
                ],
              }
            : {}),
          ...(input.stage ? { stage: input.stage } : {}),
        },
        include: {
          tags: true,
          contributors: true,
        },
      });
    }),
});
