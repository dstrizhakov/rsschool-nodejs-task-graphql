import {GraphQLSchema} from 'graphql';
import {queryTypes} from './queryTypes/queryTypes.js';
import {mutationTypes} from './mutationTypes/mutationTypes.js';

export const graphqlSchema = new GraphQLSchema({
    query: queryTypes,
    mutation: mutationTypes,
});
