import { GraphQLSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { createQuery } from './query.js';
import { createMutation } from './mutation.js';
import { createProfileType } from './types/profileType.js';
import { createUserType } from './types/userType.js';

export function createSchema(prisma: PrismaClient) {
  const profileType = createProfileType(prisma);
  const userType = createUserType(prisma, profileType);

  const query = createQuery(prisma, profileType, userType);
  const mutation = createMutation(prisma, profileType, userType);

  return new GraphQLSchema({
    query: query,
    mutation: mutation,
  });
}
