import { GraphQLObjectType, GraphQLList } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { createUserType } from './types/userType.js';
import { MemberTypeEnum, memberType } from './types/memberType.js';
import { UUIDType } from './types/uuid.js';
import { postType } from './types/postType.js';
import { createProfileType } from './types/profileType.js';
import { typeWithID } from './types/types.js';

export function createQuery(prisma: PrismaClient) {
  const profileType = createProfileType(prisma);
  const userType = createUserType(prisma, profileType);

  return new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: async () => {
          return prisma.user.findMany();
        },
      },
      user: {
        type: userType,
        args: { id: { type: UUIDType } },
        resolve: async (_, args: typeWithID) => {
          return prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
      memberTypes: {
        type: new GraphQLList(memberType),
        resolve: async () => {
          return prisma.memberType.findMany();
        },
      },
      memberType: {
        type: memberType,
        args: { id: { type: MemberTypeEnum } },
        resolve: async (_, args: typeWithID) => {
          return prisma.memberType.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: async () => {
          return prisma.post.findMany();
        },
      },
      post: {
        type: postType,
        args: { id: { type: UUIDType } },
        resolve: (_, args: typeWithID) => {
          return prisma.post.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
      profiles: {
        type: new GraphQLList(profileType),
        resolve: async () => {
          return prisma.profile.findMany();
        },
      },
      profile: {
        type: profileType,
        args: { id: { type: UUIDType } },
        resolve: (_, args: typeWithID) => {
          return prisma.profile.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
    },
  });
}
