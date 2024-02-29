import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';

export const memberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: {
        type: GraphQLString,
        description: 'Unique identifier for the member type',
      },
      discount: {
        type: GraphQLFloat,
        description: 'Discount applied to members of this type (percentage)',
      },
      postsLimitPerMonth: {
        type: GraphQLInt,
        description: 'Number of posts allowed per month for members of this type',
      },
    }),
  });