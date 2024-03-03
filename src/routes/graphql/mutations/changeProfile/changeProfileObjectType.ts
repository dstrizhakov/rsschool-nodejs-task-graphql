import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { memberEnumType } from '../../query/memberQuery/memberObjectType.js';

export const changeProfileObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: memberEnumType,
    },
  },
});
