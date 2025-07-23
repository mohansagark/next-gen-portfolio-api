// import { PrismaClient } from '@prisma/client';

// Temporary: using mock until Prisma client is generated
export interface PrismaClient {
  education: any;
  project: any;
  experience: any;
  contact: any;
  user: any;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient = {
  education: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  project: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  experience: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  contact: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  user: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({
      id: 'mock-user-id',
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedpassword',
      role: 'admin',
    }),
    update: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
} as any;

// Export as database for auth service
export const database = prisma;

// Real implementation (commented out until Prisma client is generated):
/*
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
*/
