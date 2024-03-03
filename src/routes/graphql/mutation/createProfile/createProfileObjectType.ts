import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { memberEnumType } from '../../query/memberQuery/memberObjectType.js';

export const createProfileObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(memberEnumType),
    },
  },
});
