import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { postType } from './postType.js';
import { PrismaClient } from '@prisma/client';
import { typeWithID } from './types.js';

export function createUserType(prisma: PrismaClient, profileType: GraphQLObjectType) {
  const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    description: 'The user',
    fields: () => ({
      id: {
        type: UUIDType,
        description: 'The unique identifier of the user',
      },
      name: {
        type: GraphQLString,
        description: 'The name of the user',
      },
      balance: {
        type: GraphQLFloat,
        description: 'The balance of the user',
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: async (parent: typeWithID) => {
          return prisma.post.findMany({
            where: {
              authorId: parent.id,
            },
          });
        },
      },
      profile: {
        type: profileType,
        args: { id: { type: UUIDType } },
        resolve: async (parent: typeWithID) => {
          return prisma.profile.findUnique({
            where: {
              userId: parent.id,
            },
          });
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(userType),
        resolve: async (parent: typeWithID) => {
          return prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: parent.id,
                },
              },
            },
          });
        },
      },
      subscribedToUser: {
        type: new GraphQLList(userType),
        resolve: async (parent: typeWithID) => {
          return prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: parent.id,
                },
              },
            },
          });
        },
      },
    }),
  });
  return userType;
}
