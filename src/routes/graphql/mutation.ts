import { GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';
import { createPostGraphQL, postType } from './types/postType.js';
// import { createProfileType } from './types/profileType.js';
import { CreatePost, typeWithID } from './types/types.js';

export function createMutation(prisma: PrismaClient) {
  // const profileType = createProfileType(prisma);
  // const userType = createUserType(prisma, profileType);

  return new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      //POSTS
      createPost: {
        type: postType,
        args: {
          dto: {
            type: createPostGraphQL,
          },
        },
        resolve: (_, args: { dto: CreatePost }) => {
          return prisma.post.create({ data: args.dto });
        },
      },
      deletePost: {
        type: postType,
        args: {
          id: {
            type: UUIDType,
          },
        },
        resolve: async (_parent, args: typeWithID) => {
          await prisma.post.delete({
            where: {
              id: args.id,
            },
          });

          return null;
        },
      },
      changePost: {
        type: postType,
        args: {
          id: {
            type: UUIDType,
          },
          dto: {
            type: createPostGraphQL,
          },
        },
        resolve: (_parent, args: { id: string; dto: CreatePost }) => {
          return prisma.post.update({
            where: {
              id: args.id,
            },
            data: args.dto,
          });
        },
      },
    },
  });
}
