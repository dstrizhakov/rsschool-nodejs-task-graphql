import { PrismaClient } from '@prisma/client';
import { userLoader } from './userLoader.js';
import { profileLoader } from './profileLoader.js';
import { memberTypeLoader } from './memberTypeLoader.js';
import { postLoader } from './postLoader.js';

export const rootLoader = (prisma: PrismaClient) => ({
  userLoader: userLoader(prisma),
  profileLoader: profileLoader(prisma),
  memberTypeLoader: memberTypeLoader(prisma),
  postLoader: postLoader(prisma)
});
