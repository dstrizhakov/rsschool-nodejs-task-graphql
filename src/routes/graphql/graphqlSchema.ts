import { GraphQLSchema } from 'graphql';
import { query } from './query/query.js';
import { mutation } from './mutation/mutation.js';

export const graphqlSchema = new GraphQLSchema({
  query,
  mutation,
});
