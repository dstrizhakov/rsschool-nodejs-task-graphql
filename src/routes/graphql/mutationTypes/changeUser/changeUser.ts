import { GraphQLNonNull } from 'graphql';
import { userObjectType } from '../../queryTypes/userQuery/userObjectType.js';
import { Context } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { changeUserObjectType } from './changeUserObjectType.js';

interface ChangeUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

export const changeUser = {
  changeUser: {
    type: userObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changeUserObjectType),
      },
    },
    resolve: async (_source, args: ChangeUser, context: Context) => {
      return await context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};
