import { GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';
import { changePostGraphQL, createPostGraphQL, postType } from './types/postType.js';
import {
  ChangePost,
  ChangeProfile,
  ChangeSubscribeTo,
  CreatePost,
  CreateProfile,
  CreateUser,
  typeWithID,
} from './types/types.js';
import { changeUserGraphQL, createUserGraphQL } from './types/userType.js';
import { changeProfileGraphQL, createProfileGraphQL } from './types/profileType.js';

export function createMutation(
  prisma: PrismaClient,
  profileType: GraphQLObjectType,
  userType: GraphQLObjectType,
) {
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
        type: UUIDType,
        args: {
          id: {
            type: UUIDType,
          },
        },
        resolve: async (_, args: typeWithID) => {
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
            type: changePostGraphQL,
          },
        },
        resolve: (_, args: { id: string; dto: ChangePost }) => {
          return prisma.post.update({
            where: {
              id: args.id,
            },
            data: args.dto,
          });
        },
      },
      //USER
      createUser: {
        type: userType,
        args: {
          dto: {
            type: createUserGraphQL,
          },
        },
        resolve: (_, args: { dto: CreateUser }) => {
          return prisma.user.create({ data: args.dto });
        },
      },
      deleteUser: {
        type: UUIDType,
        args: {
          id: {
            type: UUIDType,
          },
        },
        resolve: async (_, args: typeWithID) => {
          await prisma.user.delete({
            where: {
              id: args.id,
            },
          });
          return null;
        },
      },
      changeUser: {
        type: userType,
        args: {
          id: {
            type: UUIDType,
          },
          dto: {
            type: changeUserGraphQL,
          },
        },
        resolve: (_parent, args: { id: string; dto: CreateUser }) => {
          return prisma.user.update({
            where: {
              id: args.id,
            },
            data: args.dto,
          });
        },
      },
      //PROFILE
      createProfile: {
        type: profileType,
        args: {
          dto: {
            type: createProfileGraphQL,
          },
        },
        resolve: (_, args: { dto: CreateProfile }) => {
          return prisma.profile.create({ data: args.dto });
        },
      },
      deleteProfile: {
        type: UUIDType,
        args: {
          id: {
            type: UUIDType,
          },
        },
        resolve: async (_, args: typeWithID) => {
          await prisma.profile.delete({
            where: {
              id: args.id,
            },
          });
          return null;
        },
      },
      changeProfile: {
        type: profileType,
        args: {
          id: {
            type: UUIDType,
          },
          dto: {
            type: changeProfileGraphQL,
          },
        },
        resolve: (_parent, args: { id: string; dto: ChangeProfile }) => {
          return prisma.profile.update({
            where: {
              id: args.id,
            },
            data: args.dto,
          });
        },
      },
      //user-subscribed-to
      subscribeTo: {
        type: userType,
        args: {
          userId: {
            type: UUIDType,
          },
          authorId: {
            type: UUIDType,
          },
        },
        resolve: (_, args: ChangeSubscribeTo) => {
          return prisma.user.update({
            where: {
              id: args.userId,
            },
            data: {
              userSubscribedTo: {
                create: {
                  authorId: args.authorId,
                },
              },
            },
          });
        },
      },
      unsubscribeFrom: {
        type: UUIDType,
        args: {
          userId: {
            type: UUIDType,
          },
          authorId: {
            type: UUIDType,
          },
        },
        resolve: async (_, args: ChangeSubscribeTo) => {
          await prisma.subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: {
                subscriberId: args.userId,
                authorId: args.authorId,
              },
            },
          });
          return null;
        },
      },
    },
  });
}
