import { GraphQLObjectType, GraphQLString, GraphQLFloat} from 'graphql';
import { UUIDType } from './uuid.js';


export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'The user',
    fields: () => ({
      id: {
        type: UUIDType,
        description: 'The unique identifier of the user',
      },
      name: {
        type: GraphQLString,
        description: 'The name of the user',
      },
      balance: {
        type: GraphQLFloat,
        description: 'The balance of the user',
      },
    }),
  });
