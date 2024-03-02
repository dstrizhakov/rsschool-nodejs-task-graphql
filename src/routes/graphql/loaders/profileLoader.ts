import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    return await prisma.profile
      .findMany({
        where: {
          userId: { in: ids as string[] },
        },
      })
      .then((profiles) =>
        ids.map((id) => profiles.find((profile) => profile.userId === id)),
      );
  });
};
