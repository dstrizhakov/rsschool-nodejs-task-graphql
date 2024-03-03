import { GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { userObjectType } from '../userQuery/userObjectType.js';
import { Post } from '@prisma/client';
import { Context } from '../../types/context.js';

export const postObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: UUIDType,
    },
    content: {
      type: UUIDType,
    },
    author: {
      type: userObjectType,
      resolve: async (source: Post, _args, context: Context) => {
        return await context.prisma.user.findUnique({
          where: {
            id: source.authorId,
          },
        });
      },
    },
    authorId: {
      type: UUIDType,
    },
  }),
});
