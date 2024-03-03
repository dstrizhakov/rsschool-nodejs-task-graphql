import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { User } from '@prisma/client';
import { Context } from '../../types/context.js';

export const deleteUser = {
  deleteUser: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: User, context: Context) => {
      await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
