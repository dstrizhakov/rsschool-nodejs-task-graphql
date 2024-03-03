import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../types/context.js';
import { userObjectType } from '../../queryTypes/userQuery/userObjectType.js';

interface UnsubscribeFrom {
  userId: string;
  authorId: string;
}

export const unsubscribeFrom = {
  unsubscribeFrom: {
    type: userObjectType,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: UnsubscribeFrom, context: Context) => {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });
      return args.userId;
    },
  },
};
