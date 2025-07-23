// Temporary mock for Prisma client during initial build
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
  education: {},
  project: {},
  experience: {},
  contact: {},
  user: {},
} as any;
