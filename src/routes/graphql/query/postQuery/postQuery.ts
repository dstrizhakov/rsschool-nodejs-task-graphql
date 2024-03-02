import { postObjectType } from './postObjectType.js';
import { Post } from '@prisma/client';
import { Context } from '../../types/context.js';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const postQuery = {
  post: {
    type: postObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Post, context: Context) => {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  posts: {
    type: new GraphQLList(postObjectType),
    resolve: async (_source, _args, context: Context) => {
      return await context.prisma.post.findMany();
    },
  },
};
