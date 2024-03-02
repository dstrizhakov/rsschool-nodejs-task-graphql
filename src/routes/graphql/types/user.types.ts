import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, graphql } from "graphql";

export const CreateUserInput = new GraphQLInputObjectType(
    {
        name: 'CreateUserInput',
        fields: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            balance: {type: new GraphQLNonNull(GraphQLFloat)}
        }
    }
)