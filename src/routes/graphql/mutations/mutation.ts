import { GraphQLObjectType } from 'graphql';
import { createUser } from './createUser/createUser.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...createUser,
  },
});
