// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import Pagination from '../pagination.js'

import UserType from './UserType';
import User from '../../proxy/user'

let usersPagination = new Pagination({
  name: 'Users',
  type: UserType,
})

let UserQuery = {
  users: {
    type: usersPagination.type,
    descriptions: '所有用户',
    args: {
      ...usersPagination.args
    },
    resolve: async(root, args) => {
      let users = await User.getUsers()

      return await usersPagination.resolve(users, args)
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