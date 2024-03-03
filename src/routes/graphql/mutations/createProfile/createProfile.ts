import { GraphQLNonNull } from 'graphql';
import { profileObjectType } from '../../query/profileQuery/profileObjectType.js';
import { Context } from '../../types/context.js';

interface CreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  };
}

export const createProfile = {
  createProfile: {
    type: profileObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(profileObjectType),
      },
    },
    resolve: async (_source, args: CreateProfile, context: Context) => {
      return await context.prisma.profile.create({
        data: args.dto,
      });
    },
  },
};
