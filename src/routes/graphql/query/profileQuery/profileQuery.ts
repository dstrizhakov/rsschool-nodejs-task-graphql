import { profileObjectType } from './profileObjectType.js';
import { Profile } from '@prisma/client';
import { Context } from '../../types/context.js';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const profileQuery = {
  profile: {
    type: profileObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Profile, context: Context) => {
      return await context.prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  profiles: {
    type: new GraphQLList(profileObjectType),
    resolve: async (_source, _args, context: Context) => {
      return context.prisma.profile.findMany();
    },
  },
};
