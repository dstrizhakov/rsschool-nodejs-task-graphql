import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { profileObjectType } from '../profileQuery/profileObjectType.js';
import { User } from '@prisma/client';
import { Context } from '../../types/context.js';

export const userObjectType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: profileObjectType,
      resolve: async (source: User, context: Context) => {
        return await context.loaders.profileLoader.load(source.id);
      },
    },
  }),
});
