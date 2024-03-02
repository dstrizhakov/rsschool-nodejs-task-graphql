import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const createUserObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(UUIDType),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});
