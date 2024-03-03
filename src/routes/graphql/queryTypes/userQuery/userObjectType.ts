import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { profileObjectType } from '../profileQuery/profileObjectType.js';
import { User } from '@prisma/client';
import { Context } from '../../types/context.js';
import { postObjectType } from '../postQuery/postObjectType.js';

export interface UserSubscribed extends User {
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
}

export const userObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: UUIDType,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: profileObjectType,
      resolve: async (source: User, _args, context: Context) => {
        return await context.loaders.profileLoader.load(source.id);
      },
    },
    posts: {
      type: new GraphQLList(postObjectType),
      resolve: async (source: User, _args, context: Context) => {
        return await context.loaders.postLoader.load(source.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userObjectType),
      resolve: async (source: UserSubscribed, _args, context: Context) => {
        if (source.userSubscribedTo) {
          const authorsId = source.userSubscribedTo.map((user) => user.authorId);
          return await context.loaders.userLoader.loadMany(authorsId);
        }
        return await context.loaders.userSubscribedToLoader.load(source.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userObjectType),
      resolve: async (source: UserSubscribed, _args, context: Context) => {
        if (source.subscribedToUser) {
          const subscribersId = source.subscribedToUser.map((user) => user.subscriberId);
          return await context.loaders.userLoader.loadMany(subscribersId);
        }
        return await context.loaders.subscribedToUserLoader.load(source.id);
      },
    },
  }),
});
