import { GraphQLObjectType, GraphQLInt, GraphQLEnumType, GraphQLFloat } from 'graphql';

export const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const memberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: {
        type: MemberTypeEnum,
        description: 'An enum describing the options for `memberType`: `basic`, `business`',
      },
      discount: {
        type: GraphQLFloat,
        description: 'Discount applied to members of this type',
      },
      postsLimitPerMonth: {
        type: GraphQLInt,
        description: 'Number of posts allowed per month for members of this type',
      },
    }),
  });