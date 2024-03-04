import { memberEnumType, memberObjectType } from './memberObjectType.js';
import { MemberType } from '@prisma/client';
import { Context } from '../../types/context.js';
import { GraphQLList, GraphQLNonNull } from 'graphql';

export const memberQuery = {
  memberType: {
    type: memberObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(memberEnumType),
      },
    },
    resolve: async (_source, args: MemberType, context: Context) => {
      return await context.prisma.memberType.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  memberTypes: {
    type: new GraphQLList(memberObjectType),
    resolve: async (_source, _args, context: Context) => {
      return await context.prisma.memberType.findMany();
    },
  },
};
