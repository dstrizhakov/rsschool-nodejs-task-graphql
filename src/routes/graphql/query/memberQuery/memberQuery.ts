import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { memberEnumType, memberObjectType } from './memberObjectType.js';
import { MemberType } from '@prisma/client';
import { Context } from '../../types/context.js';

export const memberQuery = {
  memberType: {
    type: memberObjectType as GraphQLObjectType<MemberType, Context>,
    args: {
      id: {
        type: new GraphQLNonNull(memberEnumType),
      },
    },
    resolve: async (args: MemberType, context: Context) => {
      return await context.prisma.memberType.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  memberTypes: {
    type: new GraphQLList(memberObjectType),
    resolve: async (context: Context) => {
      return await context.prisma.memberType.findMany();
    },
  },
};
