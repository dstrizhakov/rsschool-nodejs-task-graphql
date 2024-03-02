import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { userObjectType } from '../userQuery/userObjectType.js';
import { Profile } from '@prisma/client';
import { memberEnumType, memberObjectType } from '../memberQuery/memberObjectType.js';
import { Context } from '../../types/context.js';

export const profileObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    user: {
      type: userObjectType,
      resolve: async (source: Profile, context: Context) => {
        return await context.prisma.user.findUnique({
          where: {
            id: source.userId,
          },
        });
      },
    },
    iserId: {
      type: UUIDType,
    },
    memberType: {
      type: memberObjectType,
      resolve: async (source: Profile, context: Context) => {
        return await context.loaders.memberTypeLoader.load(source.memberTypeId);
      },
    },
    memberTypeId: {
      type: memberEnumType,
    },
  }),
});
