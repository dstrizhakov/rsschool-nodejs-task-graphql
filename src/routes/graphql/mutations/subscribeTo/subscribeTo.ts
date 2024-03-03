import { GraphQLNonNull } from 'graphql';
import { userObjectType } from '../../query/userQuery/userObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../types/context.js';

interface SubscribeTo {
  userId: string;
  authorId: string;
}

export const subscribeTo = {
  subscribeTo: {
    type: userObjectType,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve: async (_source, args: SubscribeTo, context: Context) => {
    return await context.prisma.user.update({
      where: {
        id: args.userId,
      },
      data: {
        userSubscribedTo: {
          create: {
            authorId: args.authorId,
          },
        },
      },
    });
  },
};
