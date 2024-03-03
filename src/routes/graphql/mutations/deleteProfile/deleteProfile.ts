import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Profile } from '@prisma/client';
import { Context } from '../../types/context.js';

export const deleteProfile = {
  deleteProfile: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Profile, context: Context) => {
      await context.prisma.profile.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
