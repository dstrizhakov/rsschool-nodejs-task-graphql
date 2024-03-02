import { GraphQLObjectType } from 'graphql';
import { userQuery } from './userQuery/userQuery.js';
import { profileQuery } from './profileQuery/profileQuery.js';
import { memberQuery } from './memberQuery/memberQuery.js';

export const queryTypes = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQuery,
    ...profileQuery,
    ...memberQuery,
  }),
});
