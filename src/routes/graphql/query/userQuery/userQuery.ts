import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { userObjectType } from './userObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { PrismaClient, User } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';
import DataLoader from 'dataloader';
import {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
  ResolveTree,
} from 'graphql-parse-resolve-info';

export interface Loaders {
  userLoader: DataLoader<string, User>;
}

export interface Context {
  prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
  loaders: Loaders;
}

export const userQuery = {
  user: {
    type: userObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (args: User, context: Context) => {
      return await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  users: {
    type: new GraphQLList(userObjectType),
    resolve: async (context: Context, resolveInfo: GraphQLResolveInfo) => {
      const parsedResolveInfo = parseResolveInfo(resolveInfo);
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfo as ResolveTree,
        new GraphQLList(userObjectType),
      );

      return await context.prisma.user
        .findMany({
          include: {
            userSubscribedTo: 'userSubscribedTo' in fields,
            subscribedToUser: 'subscribedToUser' in fields,
          },
        })
        .then((users) =>
          users.forEach((user) => context.loaders.userLoader.prime(user.id, user)),
        );
    },
  },
};