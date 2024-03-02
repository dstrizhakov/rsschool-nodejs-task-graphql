import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    return await prisma.memberType
      .findMany({
        where: {
          id: { in: ids as string[] },
        },
      })
      .then((memberTypes) =>
        ids.map((id) => memberTypes.find((memberType) => memberType.id === id)),
      );
  });
};
