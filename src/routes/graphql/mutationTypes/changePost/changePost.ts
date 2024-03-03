import { GraphQLNonNull } from 'graphql';
import { Context } from '../../types/context.js';
import { postObjectType } from '../../queryTypes/postQuery/postObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { changePostObjectType } from './changePostObjectType.js';

interface ChangePost {
  id: string;
  dto: {
    title: string;
    content: string;
  };
}

export const changePost = {
  changePost: {
    type: postObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changePostObjectType),
      },
    },
    resolve: async (_source, args: ChangePost, context: Context) => {
      return await context.prisma.post.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

