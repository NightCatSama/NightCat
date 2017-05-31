import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'user id'
    },
    account: {
      type: GraphQLString,
      description: 'user account'
    },
    name: {
      type: GraphQLString,
      description: 'user name'
    },
    email: {
      type: GraphQLString,
      description: 'user email'
    },
    avatar: {
      type: GraphQLString,
      description: 'user avatar'
    },
    password: {
      type: GraphQLString,
      description: 'user password'
    }
  })
});

export default UserType;