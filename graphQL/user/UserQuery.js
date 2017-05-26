// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import UserType from './UserType.js';
import User from '../../models/user.js';
import { getUsers, getUserByAccount } from '../../proxy/user.js'

let UserQuery = {
  users: {
    type: new GraphQLList(UserType),
    descriptions: 'All users info',
    resolve: (root) => {
      console.log(root)
      return getUsers()
    }
  },
  user: {
    type: UserType,
    descriptions: 'User info by account',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, { account }) => {
      console.log(root)
      console.log(account)
      return getUserByAccount(account)
    }
  },
  count: {
    type: new GraphQLNonNull(GraphQLInt),
    descriptions: 'test',
    resolve: () => {
      return 123
    }
  },
};


export default UserQuery;