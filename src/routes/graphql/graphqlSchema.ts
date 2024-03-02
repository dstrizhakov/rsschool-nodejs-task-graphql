import { GraphQLSchema } from "graphql";
import { query } from "./query/query.js";
import { mutation } from "./mutations/mutation.js";

export const graphqlSchema = new GraphQLSchema({
    query,
    mutation,
})