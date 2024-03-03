import { GraphQLNonNull } from 'graphql';
import { changeProfileObjectType } from './changeProfileObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { profileObjectType } from '../../queryTypes/profileQuery/profileObjectType.js';
import { Context } from '../../types/context.js';

interface ChangeProfile {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  };
}

export const changeProfile = {
  changeProfile: {
    type: profileObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changeProfileObjectType),
      },
    },
    resolve: async (_source, args: ChangeProfile, context: Context) => {
      return await context.prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};
