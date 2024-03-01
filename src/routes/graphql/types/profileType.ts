import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeEnum } from './memberType.js';

export const profileType = new GraphQLObjectType({
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
    }),
  });