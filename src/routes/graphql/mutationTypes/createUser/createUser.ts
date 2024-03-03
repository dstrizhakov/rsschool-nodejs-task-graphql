import { GraphQLNonNull } from 'graphql';
import { userObjectType } from '../../queryTypes/userQuery/userObjectType.js';
import { createUserObjectType } from './createUserObjectType.js';
import { Context } from '../../types/context.js';

interface UserInput {
  dto: {
    name: string;
    balance: number;
  };
}

export const createUser = {
  createUser: {
    type: userObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(createUserObjectType),
      },
    },
    resolve: async (_source, args: UserInput, context: Context) => {
      return await context.prisma.user.create({
        data: args.dto,
      });
    },
  },
};
