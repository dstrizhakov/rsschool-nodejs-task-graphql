import { GraphQLObjectType } from 'graphql';
import { createUser } from './createUser/createUser.js';
import { createPost } from './createPost/createPost.js';
import { changePost } from './changePost/changePost.js';
import { changeUser } from './changePost/changeUser/changeUser.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...createUser,
    ...changeUser,
    ...createPost,
    ...changePost,
  },
});
