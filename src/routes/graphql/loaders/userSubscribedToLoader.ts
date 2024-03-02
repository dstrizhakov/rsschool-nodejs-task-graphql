import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const userSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    return await prisma.user
      .findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: { in: ids as string[] },
            },
          },
        },
      })
      .then((users) => ids.map(() => users));
  });
};
