import { PrismaClient } from '@prisma/client';
import { userLoader } from './userLoader.js';

export const rootLoader = (prisma: PrismaClient) => ({
  userLoader: userLoader(prisma),
});
