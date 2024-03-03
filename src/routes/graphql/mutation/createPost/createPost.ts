import { GraphQLNonNull } from 'graphql';
import { postObjectType } from '../../query/postQuery/postObjectType.js';
import { Context } from '../../types/context.js';
import { createPostObjectType } from './createPostObjectType.js';

interface CreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

export const createPost = {
  createPost: {
    type: postObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(createPostObjectType),
      },
    },
    resolve: async (_source, args: CreatePost, context: Context) => {
      return await context.prisma.post.create({
        data: args.dto,
      });
    },
  },
};
