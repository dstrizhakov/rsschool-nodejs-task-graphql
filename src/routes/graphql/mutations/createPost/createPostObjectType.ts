import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const createPostObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(UUIDType),
    },
    content: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});
