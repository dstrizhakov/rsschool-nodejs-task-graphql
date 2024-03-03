import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { userObjectType } from './userObjectType.js';
import { User } from '@prisma/client';
import {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
  ResolveTree,
} from 'graphql-parse-resolve-info';
import { Context } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';

export const userQuery = {
  user: {
    type: userObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: User, context: Context) => {
      return await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          userSubscribedTo: true,
          subscribedToUser: true,
        },
      });
    },
  },
  users: {
    type: new GraphQLList(userObjectType),
    resolve: async (
      _source,
      _args,
      context: Context,
      resolveInfo: GraphQLResolveInfo,
    ) => {
      const parsedResolveInfo = parseResolveInfo(resolveInfo);
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfo as ResolveTree,
        new GraphQLList(userObjectType),
      );

      const userSubscribedTo = 'userSubscribedTo' in fields;
      const subscribedToUser = 'subscribedToUser' in fields;

      const users = await context.prisma.user.findMany({
        include: {
          userSubscribedTo,
          subscribedToUser,
        },
      });
      users.forEach((user) => {
        context.loaders.userLoader.prime(user.id, user);
      });
      return users;
    },
  },
};
