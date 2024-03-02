import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../../member-types/schemas.js';
import { MemberType } from '@prisma/client';
import { Context } from '../../types/context.js';
import { profileObjectType } from '../profileQuery/profileObjectType.js';

export const memberEnumType = new GraphQLEnumType({
  name: 'MemberEnumType',
  values: {
    basic: {
      value: MemberTypeId.BASIC,
    },
    business: {
      value: MemberTypeId.BUSINESS,
    },
  },
});

export const memberObjectType = new GraphQLObjectType<MemberType, Context>({
  name: 'Member',
  fields: () => ({
    id: {
      type: memberEnumType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    profiles: {
      type: new GraphQLList(profileObjectType),
      resolve: async (source: MemberType, context: Context) => {
        return await context.prisma.profile.findMany({
          where: {
            memberTypeId: source.id,
          },
        });
      },
    },
  }),
});
