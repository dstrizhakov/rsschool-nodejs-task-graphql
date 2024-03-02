import { GraphQLSchema } from "graphql";
import { queryTypes } from "./query/queryTypes.js";
import { mutationTypes } from "./mutations/mutationTypes.js";

export const graphqlSchema = new GraphQLSchema({
    query: queryTypes,
    mutation: mutationTypes
})