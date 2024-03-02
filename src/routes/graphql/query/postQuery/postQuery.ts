import { GraphQLList, GraphQLNonNull } from 'graphql';
import { postObjectType } from './postObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { Post } from '@prisma/client';
import { Context } from '../../types/context.js';

export const postQuery = {
  post: {
    type: postObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (source, args: Post, context: Context) => {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  posts: {
    type: new GraphQLList(postObjectType),
    resolve: async (source, args, context: Context) => {
      return await context.prisma.post.findMany();
    },
  },
};
