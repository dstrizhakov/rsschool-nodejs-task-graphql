import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    return await prisma.post
      .findMany({
        where: {
          authorId: { in: ids as string[] },
        },
      })
      .then((posts) => ids.map((id) => posts.filter((post) => post.authorId === id)));
  });
};
