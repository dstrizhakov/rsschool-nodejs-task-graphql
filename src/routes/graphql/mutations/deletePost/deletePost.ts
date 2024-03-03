import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Post } from '@prisma/client';
import { Context } from '../../types/context.js';

export const deletePost = {
  deletePost: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Post, context: Context) => {
      await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
