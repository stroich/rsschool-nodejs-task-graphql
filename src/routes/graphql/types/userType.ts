import { GraphQLObjectType, GraphQLString, GraphQLFloat} from 'graphql';
import { UUIDType } from './uuid.js';


export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'The user',
    fields: () => ({
      id: {
        type: UUIDType,
        description: 'The id',
      },
      name: {
        type: GraphQLString,
        description: 'The name',
      },
      balance: {
        type: GraphQLFloat,
        description: 'The balance',
      },
    }),
  });
