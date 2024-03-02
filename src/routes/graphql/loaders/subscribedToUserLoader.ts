import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const subscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    return await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: { in: ids as string[] },
          },
        },
      },
    }).then(users=> ids.map(() => users));
  });
};
