import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";

export const userObjectType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: UUIDType
        },
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    })
})