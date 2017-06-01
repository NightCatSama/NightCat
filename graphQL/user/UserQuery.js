// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import UserType from './UserType.js';
import User from '../../proxy/user.js'

let UserQuery = {
  users: {
    type: new GraphQLList(UserType),
    descriptions: 'All users info',
    resolve: async() => {
      return await User.getUsers()
    }
  },
  user: {
    type: UserType,
    descriptions: 'User info by account',
    args: {
      account: {
        type: GraphQLString
      }
    },
    resolve: async(root, { account }) => {
      if (account) {
        return await User.getUserByAccount(account)
      }
      else {
        if (!root.user) throw Error('身份认证失败')

        return root.user
      }
    }
  }
};


export default UserQuery;