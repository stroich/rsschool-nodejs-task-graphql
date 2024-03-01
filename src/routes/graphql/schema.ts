import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { PrismaClient  } from '@prisma/client';
import { createUserType } from './types/userType.js';
import { MemberTypeEnum, memberType } from './types/memberType.js';
import { UUIDType } from './types/uuid.js';
import { postType } from './types/postType.js';
import { profileType } from './types/profileType.js';

export function createSchema (prisma: PrismaClient){
  const userType = createUserType(prisma);

  return new GraphQLSchema({
    query: new GraphQLObjectType({
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
          resolve: async (_parent, args: { id: string }) => {
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
          resolve: async (_parent, args: { id: string }) => {
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
        profiles: {
          type: new GraphQLList(profileType),
          resolve: async () => {
            return prisma.profile.findMany();
          },
        },
      },
    }),
  });
}
