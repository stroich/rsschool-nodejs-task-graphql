import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeEnum, memberType } from './memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { PrismaClient } from '@prisma/client';

export function createProfileType(prisma: PrismaClient) {
  return new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: {
        type: UUIDType,
        description: 'The unique identifier of the profile',
      },
      isMale: {
        type: GraphQLBoolean,
        description: 'Whether the user is male or female',
      },
      yearOfBirth: {
        type: GraphQLInt,
        description: 'The year of birth of the user',
      },
      userId: {
        type: UUIDType,
        description: 'The ID of the user the profile belongs to',
      },
      memberTypeId: {
        type: MemberTypeEnum,
        description: 'The type of membership the user has',
      },
      memberType: {
        type: memberType,
        resolve: async (parent: { memberTypeId: MemberTypeId }) => {
          return prisma.memberType.findUnique({
            where: {
              id: parent.memberTypeId,
            },
          });
        },
      },
    }),
  });
}
