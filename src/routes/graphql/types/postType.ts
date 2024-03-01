import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

export const postType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: {
        type: UUIDType,
        description: 'The unique identifier of the post',
      },
      title: {
        type: GraphQLString,
        description: 'The title of the post',
      },
      content: {
        type: GraphQLString,
        description: 'The content of the post',
      },
      authorId: {
        type: UUIDType,
        description: 'The ID of the author of the post',
      },
    }),
  });