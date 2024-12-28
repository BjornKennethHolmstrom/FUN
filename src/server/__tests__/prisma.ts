// src/server/__tests__/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var __prismaTestClient: PrismaClient | undefined;
}

function getTestPrisma() {
  if (!global.__prismaTestClient) {
    global.__prismaTestClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
  return global.__prismaTestClient;
}

// Add a test to satisfy Jest
test('Prisma client is defined', () => {
  expect(getTestPrisma()).toBeDefined();
});

export const testPrisma = getTestPrisma();
