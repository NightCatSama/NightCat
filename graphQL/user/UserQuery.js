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
    resolve: (user) => {
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
    resolve: (user, { account }) => {
      return getUserByAccount(account)
    }
  }
};


export default UserQuery;