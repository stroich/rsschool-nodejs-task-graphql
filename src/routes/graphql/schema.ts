import { GraphQLSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { createQuery } from './query.js';
import { createMutation } from './mutation.js';

export function createSchema(prisma: PrismaClient) {
  const query = createQuery(prisma);
  const mutation = createMutation(prisma);

  return new GraphQLSchema({
    query: query,
    mutation: mutation,
  });
}
