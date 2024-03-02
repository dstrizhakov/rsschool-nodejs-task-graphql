import { GraphQLFieldConfigMap, GraphQLList, GraphQLNonNull } from 'graphql';
import { profileObjectType } from './profileObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { Profile } from '@prisma/client';
import { Context } from '../../types/context.js';

export const profileQuery: GraphQLFieldConfigMap<Profile, Context> = {
  profile: {
    type: profileObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (source, args: Profile, context: Context) => {
      return await context.prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  profiles: {
    type: new GraphQLList(profileObjectType),
    resolve: async (source, args: Profile, context: Context) => {
      return context.prisma.profile.findMany();
    },
  },
};
