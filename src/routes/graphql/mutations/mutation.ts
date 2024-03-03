import { GraphQLObjectType } from 'graphql';
import { createUser } from './createUser/createUser.js';
import { createPost } from './createPost/createPost.js';
import { changePost } from './changePost/changePost.js';
import { changeUser } from './changeUser/changeUser.js';
import { createProfile } from './createProfile/createProfile.js';
import { changeProfile } from './changeProfile/changeProfile.js';
import { deleteUser } from './deleteUser/deleteUser.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...createUser,
    ...changeUser,
    ...deleteUser,
    ...createPost,
    ...changePost,
    ...createProfile,
    ...changeProfile,
  },
});
