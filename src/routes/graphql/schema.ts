import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { PrismaClient  } from '@prisma/client';
import { userType } from './types/userType.js';
import { memberType } from './types/memberType.js';
import { UUIDType } from './types/uuid.js';

export function createSchema (prisma: PrismaClient){
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
        
      },
    }),
  });
}
