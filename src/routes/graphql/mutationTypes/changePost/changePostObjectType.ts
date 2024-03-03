import { GraphQLInputObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const changePostObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: UUIDType,
    },
    content: {
      type: UUIDType,
    },
  }),
});
