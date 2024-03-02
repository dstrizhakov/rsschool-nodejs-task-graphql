import { GraphQLObjectType } from "graphql";
import { userQuery } from "./userQuery/userQuery.js";

export const queryTypes = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        ...userQuery
    })
})