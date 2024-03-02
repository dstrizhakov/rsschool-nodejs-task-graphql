import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { profileObjectType } from './profileObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { Profile } from '@prisma/client';
import { Context } from '../../types/context.js';

export const profileQuery = {
  profile: {
    type: profileObjectType as GraphQLObjectType<Profile, Context>,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (args: Profile, context: Context) => {
      return await context.prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  profiles: {
    type: new GraphQLList(profileObjectType),
    resolve: async (context: Context) => {
      return context.prisma.profile.findMany();
    },
  },
};
